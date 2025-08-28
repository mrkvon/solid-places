import { AccessModeList } from '@ldo/connected-solid'
import { expect } from '@playwright/test'

interface Access extends AccessModeList {
  default?: boolean
}

interface AccessRule {
  public?: Access
  owner?: { default?: boolean }
  // authenticated: AccessModeList
  agent?: Record<string, Access>
  group?: Record<string, Access>
}

export const setAcl = async (
  account: { fetch: typeof globalThis.fetch; webId: string },
  uri: string,
  rules: AccessRule,
) => {
  const aclUrl = new URL(uri)
  aclUrl.pathname += '.acl'

  // ensure agent/group buckets exist
  // (harmless if they already do)
  rules.agent ||= {}
  rules.group ||= {}

  // set up owner so it's automatic
  if (!rules.agent[account.webId])
    rules.agent[account.webId] = {
      read: true,
      append: true,
      write: true,
      control: true,
      default: rules.owner?.default,
    }

  delete rules.owner

  const target = uri.split('#')[0]

  const modesToTurtle = (m: AccessModeList) => {
    const modes: string[] = []
    if (m?.read) modes.push('acl:Read')
    if (m?.append) modes.push('acl:Append')
    if (m?.write) modes.push('acl:Write')
    if (m?.control) modes.push('acl:Control')
    return modes.join(', ')
  }

  let body = `@prefix acl: <http://www.w3.org/ns/auth/acl#>.
@prefix foaf: <http://xmlns.com/foaf/0.1/>.

`

  const addAuth = (
    name: string,
    whoPredicate: 'acl:agent' | 'acl:agentGroup' | 'acl:agentClass',
    whoObject: string,
    m: Access,
  ) => {
    const modes = modesToTurtle(m)
    if (!modes) return
    body += `<#${name}> a acl:Authorization;
  ${whoPredicate} ${whoObject};
  acl:accessTo <${target}>;\n`
    if (m?.default) body += `  acl:default <${target}>;\n`
    body += `  acl:mode ${modes}.\n\n`
  }

  // public rule
  if (rules.public) addAuth('public', 'acl:agentClass', 'foaf:Agent', rules.public)

  // per-agent rules
  let i = 0
  for (const [webId, m] of Object.entries(rules.agent || {})) {
    addAuth(`agent-${++i}`, 'acl:agent', `<${webId}>`, m)
  }

  // per-group rules
  let j = 0
  for (const [groupUri, m] of Object.entries(rules.group || {})) {
    addAuth(`group-${++j}`, 'acl:agentGroup', `<${groupUri}>`, m)
  }

  const res = await account.fetch(aclUrl.toString(), {
    method: 'PUT',
    headers: { 'content-type': 'text/turtle' },
    body,
  })
  expect(res.ok).toBe(true)
}

// export const setAcl = async (
//   account: { fetch: typeof globalThis.fetch; webId: string },
//   uri: string,
//   rules: AccessRule,
// ) => {
//   const aclUrl = new URL(uri)
//   aclUrl.pathname += '.acl'

//   // set up owner so it's automatic
//   if (!rules.agent[account.webId])
//     rules.agent[account.webId] = {
//       read: true,
//       append: true,
//       write: true,
//       control: true,
//       default: rules.owner?.default,
//     }

//   delete rules.owner

//   let body = `@prefix acl: <http://www.w3.org/ns/auth/acl#>.\n`

//   for (const key in rules) {
//     if (key !== 'public' && key !== 'agent' && key !== 'group') continue

//     const rule = rules[key]

//   }

//   // if (rules.public) {
//   //   body += `<#public> a acl:Authorization;
//   //   acl:agent <${account.webId}>;
//   //   acl:accessTo <./>;
//   //   ${rules.owner?.default ? `acl:default <${removeHashFromURI(uri)}>;` : ''}
//   //   acl:mode acl:Read, acl:Write, acl:Control.
//   // `
//   // }

//   const res = await account.fetch(aclUrl, {
//     method: 'PUT',
//     headers: { 'content-type': 'text/turtle' },
//     body,
//   })
//   expect(res.ok).toBe(true)
// }

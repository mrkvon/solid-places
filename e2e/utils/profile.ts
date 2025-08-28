import { expect } from '@playwright/test'
import { randomUUID } from 'node:crypto'
import { foaf, solid, space } from 'rdf-namespaces'
import { setAcl } from './access'
import { Account } from './account'

export const setContainerAcl = async (
  account: { fetch: typeof globalThis.fetch; webId: string },
  containerUri: string | URL,
) => {
  await setAcl(account, containerUri.toString(), { owner: { default: true } })
}

export const createTypeIndex = async (
  account: { fetch: typeof globalThis.fetch; podUrl: string; webId: string },
  {
    isPrivate = true,
    filename = isPrivate ? 'privateTypeIndex.ttl' : 'publicTypeIndex.ttl',
  }: { isPrivate?: boolean; filename?: string } = {},
) => {
  const preferencesUrl = new URL(`settings/preferences.ttl`, account.podUrl)
  const typeIndexUrl = new URL(`settings/${filename}`, account.podUrl)
  if (isPrivate) {
    const typeIndexLinkResult = await account.fetch(isPrivate ? preferencesUrl : account.webId, {
      method: 'PATCH',
      headers: { 'content-type': 'text/n3' },
      body: `<> a <${solid.InsertDeletePatch}>;
      <${solid.inserts}> {
        <${account.webId}> <${isPrivate ? solid.privateTypeIndex : solid.publicTypeIndex}> <${typeIndexUrl}> .
      } .`,
    })
    expect(typeIndexLinkResult.ok).toBe(true)
  }
  const preferencesLinkResult = await account.fetch(account.webId, {
    method: 'PATCH',
    headers: { 'content-type': 'text/n3' },
    body: `<> a <${solid.InsertDeletePatch}>;
      <${solid.inserts}> {
        <${account.webId}> <${space.preferencesFile}> <${preferencesUrl}> .
      } .`,
  })
  expect(preferencesLinkResult.ok).toBe(true)

  const typeIndexResult = await account.fetch(typeIndexUrl, {
    method: 'PUT',
    headers: { 'content-type': 'text/turtle' },
    body: `
      <> a <${solid.TypeIndex}>, <${isPrivate ? solid.UnlistedDocument : solid.ListedDocument}>.
      `,
  })
  expect(typeIndexResult.ok).toBe(true)

  return typeIndexUrl
}

export const addRegistration = async (
  account: { fetch: typeof globalThis.fetch },
  typeIndexUrl: string | URL,
  classes: (string | URL)[],
  links: (URL | string)[],
) => {
  const statements: string[] = []
  statements.push(`a <${solid.TypeRegistration}>`)
  if (classes.length > 0)
    statements.push(`<${solid.forClass}> ${classes.map((c) => `<${c}>`).join(', ')}`)

  const instances = links.filter((l) => !l.toString().endsWith('/'))
  if (instances.length > 0)
    statements.push(`<${solid.instance}> ${instances.map((i) => `<${i}>`).join(', ')}`)

  const instanceContainers = links.filter((l) => l.toString().endsWith('/'))
  if (instanceContainers.length > 0)
    statements.push(
      `<${solid.instanceContainer}> ${instanceContainers.map((i) => `<${i}>`).join(', ')}`,
    )

  const registrationResult = await account.fetch(typeIndexUrl, {
    method: 'PATCH',
    headers: { 'content-type': 'text/n3' },
    body: `<> a <${solid.InsertDeletePatch}>;
      <${solid.inserts}> {
        <#${randomUUID()}> ${statements.join(';\n')} .
      } .`,
  })
  expect(registrationResult.ok).toBe(true)
}

interface Profile {
  name?: string
  knows?: string[]
}

export const saveProfile = async (account: Pick<Account, 'fetch' | 'webId'>, profile: Profile) => {
  let data = ''

  if (profile.name) data += `<${account.webId}> <${foaf.name}> "${profile.name}" .\n`

  if (profile.knows && profile.knows.length > 0)
    data += `<${account.webId}> <${foaf.knows}> ${profile.knows.map((webId) => `<${webId}>`).join(',')} .`

  if (!data) throw new Error('No data to save')

  const response = await account.fetch(account.webId, {
    method: 'PATCH',
    headers: { 'content-type': 'text/n3' },
    body: `
        <#patch> a <${solid.InsertDeletePatch}>;
        <${solid.inserts}> { ${data} }.
      `,
  })
  expect(response.ok).toBe(true)
}

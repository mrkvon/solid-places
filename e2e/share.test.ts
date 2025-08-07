import { expect, test } from '@playwright/test'
import { acl, foaf, solid } from 'rdf-namespaces'
import { createRandomAccount, signIn } from './utils/account'
import { createRandomPlace } from './utils/place'

test.describe('Share', () => {
  // share
  test.fixme('keep a place private by default', async () => {
    // ??
  })
  // sharing places has two parts
  // 1. set acl for sharing
  // 2. send a notification to a person or to a public index
  test('share places with specific people', async ({ page }) => {
    const account = await createRandomAccount()
    const alice = await createRandomAccount()
    const bob = await createRandomAccount()
    const cecilia = await createRandomAccount()

    // make alice and bob my friends
    const response = await account.fetch(account.webId, {
      method: 'PATCH',
      headers: { 'content-type': 'text/n3' },
      body: `
        <#patch> a <${solid.InsertDeletePatch}>;
        <${solid.inserts}> {
          <${account.webId}> <${foaf.knows}> <${alice.webId}>, <${bob.webId}>;
          <${foaf.name}> "Daniela" .
        }.
      `,
    })
    expect(response.ok).toBe(true)

    const response2 = await alice.fetch(alice.webId, {
      method: 'PATCH',
      headers: { 'content-type': 'text/n3' },
      body: `
        <#patch> a <${solid.InsertDeletePatch}>;
        <${solid.inserts}> { <${alice.webId}> <${foaf.name}> "Alice" . }.
      `,
    })
    expect(response2.ok).toBe(true)

    const response3 = await bob.fetch(bob.webId, {
      method: 'PATCH',
      headers: { 'content-type': 'text/n3' },
      body: `
        <#patch> a <${solid.InsertDeletePatch}>;
        <${solid.inserts}> { <${bob.webId}> <${foaf.name}> "Bob" . }.
      `,
    })
    expect(response3.ok).toBe(true)

    const response4 = await cecilia.fetch(cecilia.webId, {
      method: 'PATCH',
      headers: { 'content-type': 'text/n3' },
      body: `
        <#patch> a <${solid.InsertDeletePatch}>;
        <${solid.inserts}> { <${cecilia.webId}> <${foaf.name}> "Cecilia" . }.
      `,
    })
    expect(response4.ok).toBe(true)
    // create a few places
    for (let i = 0, len = 5; i < len; ++i) {
      await createRandomPlace(account, 'places/')
    }
    // set up places folder as private
    const result = await account.fetch(new URL('places/.acl', account.podUrl), {
      method: 'PUT',
      body: `
      <#own> a <${acl.Authorization}>;
      <${acl.agent}> <${account.webId}>;
      <${acl.accessTo}> <./>;
      <${acl.default__workaround}> <./>;
      <${acl.mode}> <${acl.Read}>, <${acl.Write}>, <${acl.Control}> .
      `,
      headers: { 'content-type': 'text/turtle' },
    })

    expect(result.ok).toEqual(true)

    // sign in
    await signIn(page, account)
    // go to list
    await page.getByRole('link', { name: 'List' }).click()
    const items = page.getByTestId('place-list').locator('li')
    await expect(items).toHaveCount(5)
    // click the lock icon
    await items.nth(2).getByRole('button', { name: 'Privacy and sharing: Private' }).click()

    // dialog opens with options private/people/public
    await expect(page.getByRole('dialog')).toBeVisible()
    // select option share with people
    await page.getByRole('radio', { name: 'Shared' }).click()
    // find or add some people in combobox

    await page.getByRole('combobox', { name: 'Name or webId' }).click()
    await page.getByRole('combobox', { name: 'Name or webId' }).fill('alic')
    await page.getByRole('option', { name: 'Alice', exact: true }).click()

    await page.getByRole('combobox', { name: 'Name or webId' }).click()
    await page.getByRole('combobox', { name: 'Name or webId' }).fill(cecilia.webId)
    await page.getByRole('option', { name: 'Cecilia', exact: true }).click()
    // click ok
    await page.getByRole('button', { name: 'Confirm' }).click()
    // acl should get updated
    // the people should receive a notification into their inbox
    // and the user is informed by toast that acl was updated
    await expect(page.getByTestId('toast-container').getByRole('alert')).toHaveCount(3)
    await expect(page.getByTestId('toast-container').getByRole('alert').first()).toContainText(
      'Access was updated',
    )
    // and the user is informed by toasts that people were informed or notification failed
    await expect(page.getByTestId('toast-container').getByRole('alert').nth(1)).toContainText(
      'Alice was notified',
    )
    await expect(page.getByTestId('toast-container').getByRole('alert').nth(2)).toContainText(
      'Cecilia was notified',
    )
    // and the lock icon changes to a people icon
    await expect(
      items.nth(2).getByRole('button', { name: 'Privacy and sharing: Shared' }),
    ).toBeVisible()
  })

  test('share places publicly', async ({ page }) => {
    const account = await createRandomAccount()
    // create a few places
    for (let i = 0, len = 5; i < len; ++i) await createRandomPlace(account, 'places/')

    // set up places folder as private
    const result = await account.fetch(new URL('places/.acl', account.podUrl), {
      method: 'PUT',
      body: `
      <#own> a <${acl.Authorization}>;
      <${acl.agent}> <${account.webId}>;
      <${acl.accessTo}> <./>;
      <${acl.default__workaround}> <./>;
      <${acl.mode}> <${acl.Read}>, <${acl.Write}>, <${acl.Control}> .
      `,
      headers: { 'content-type': 'text/turtle' },
    })
    expect(result.ok).toEqual(true)
    // sign in
    await signIn(page, account)
    // go to list
    await page.getByRole('link', { name: 'List' }).click()
    const items = page.getByTestId('place-list').locator('li')
    await expect(items).toHaveCount(5)
    // click the lock icon
    await items.nth(2).getByRole('button', { name: 'Privacy and sharing: Private' }).click()

    // dialog opens with options private/shared/public
    await expect(page.getByRole('dialog')).toBeVisible()
    // select option public
    await page.getByRole('radio', { name: 'Public' }).click()
    // click ok
    await page.getByRole('button', { name: 'Confirm' }).click()
    // acl should get updated
    // the public geoindex receives a notification into its inbox
    // and the lock icon changes to a globe icon
    await expect(
      items.nth(2).getByRole('button', { name: 'Privacy and sharing: Public' }),
    ).toBeVisible()
    await expect(page.getByTestId('toast-container').getByRole('alert')).toHaveCount(2)
    // and the user is informed by toast that the place was made public
    await expect(page.getByTestId('toast-container').getByRole('alert').nth(0)).toContainText(
      'Access was updated to public',
    )
    // and the user is informed by toast that the public index was informed
    await expect(page.getByTestId('toast-container').getByRole('alert').nth(1)).toContainText(
      'Public geoindex was notified',
    )
  })

  test.fixme('unshare (shared => private)', async () => {})
  test.fixme('unpublish (public => private)', async () => {})

  // read
  test.fixme('see places shared with me', async () => {})
  test.fixme('see places shared publicly', async () => {})
  test.fixme('keep places in my local index', async () => {})
  test.fixme('clone places to my pod', async () => {})
})

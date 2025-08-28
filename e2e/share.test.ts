import { expect, test } from '@playwright/test'
import { schema_https } from 'rdf-namespaces'
import { setAcl } from './utils/access'
import { createRandomAccount, signIn } from './utils/account'
import { createRandomPlace } from './utils/place'
import { addRegistration, createTypeIndex, saveProfile, setContainerAcl } from './utils/profile'

test.describe('Share', () => {
  let account: Awaited<ReturnType<typeof createRandomAccount>>
  let places: Awaited<ReturnType<typeof createRandomPlace>>[]
  test.beforeEach(async () => {
    account = await createRandomAccount()

    // first some places must exist, so create some places
    places = []
    for (let i = 0, len = 10; i < len; ++i) places.push(await createRandomPlace(account, 'places/'))

    const containerUri = new URL('places/', account.podUrl)
    await setContainerAcl(account, containerUri)
    const typeIndexUrl = await createTypeIndex(account)
    await addRegistration(account, typeIndexUrl, [schema_https.Place], [containerUri])
  })

  // share
  test.fixme('keep a place private by default', async () => {
    // ??
  })
  // sharing places has two parts
  // 1. set acl for sharing
  // 2. send a notification to a person or to a public index
  test('share places with specific people', async ({ page }) => {
    const alice = await createRandomAccount()
    const bob = await createRandomAccount()
    const cecilia = await createRandomAccount()

    // make alice and bob my friends
    await saveProfile(account, { name: 'Daniela', knows: [alice.webId, bob.webId] })
    await saveProfile(alice, { name: 'Alice' })
    await saveProfile(bob, { name: 'Bob' })
    await saveProfile(cecilia, { name: 'Cecilia' })

    // sign in
    await signIn(page, account)
    // go to list
    await page.getByRole('link', { name: 'List' }).click()
    const items = page.getByTestId('place-list').locator('li')
    await expect(items).toHaveCount(10)
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
    // sign in
    await signIn(page, account)
    // go to list
    await page.getByRole('link', { name: 'List' }).click()
    const items = page.getByTestId('place-list').locator('li')
    await expect(items).toHaveCount(10)
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

  test('unshare (shared => private)', async ({ page }) => {
    const alice = await createRandomAccount()
    await saveProfile(alice, { name: 'Alice' })
    // const bob = await createRandomAccount()
    // const cecilia = await createRandomAccount()
    // set up some places to be shared with other person
    const sharedPlaceUrl = places[5].url
    await setAcl(account, sharedPlaceUrl.toString(), {
      agent: {
        [alice.webId]: { read: true, write: false, append: false, control: false },
      },
    })

    // sign in
    await signIn(page, account)
    await page.getByRole('link', { name: 'List' }).click()
    const items = page.getByTestId('place-list').locator('li')
    await expect(items).toHaveCount(10)

    // test that the place shows as shared
    // click the lock icon
    const item = items.filter({ hasText: places[5].data.name })
    await item.getByRole('button', { name: 'Privacy and sharing: Shared' }).click()
    // remove the other person from shared
    await page.getByRole('button', { name: 'Remove Alice' }).click()

    // click confirm
    await page.getByRole('button', { name: 'Confirm' }).click()
    // acl should get updated
    // and the lock icon changes to a lock
    await expect(item.getByRole('button', { name: 'Privacy and sharing: Private' })).toBeVisible()
    await expect(page.getByTestId('toast-container').getByRole('alert')).toHaveCount(1)
    // and the user is informed by toast that the place was made private
    await expect(page.getByTestId('toast-container').getByRole('alert').nth(0)).toContainText(
      'Access was updated to private',
    )
    // // and the user is informed by toast that Alice was informed
    // await expect(page.getByTestId('toast-container').getByRole('alert').nth(1)).toContainText(
    //   'Alice was notified',
    // )
  })

  test('unpublish (public => private)', async ({ page }) => {
    // set up some place to be public
    const publicPlaceUrl = places[5].url
    await setAcl(account, publicPlaceUrl.toString(), {
      public: { read: true, write: false, append: false, control: false },
    })

    // sign in
    await signIn(page, account)
    await page.getByRole('link', { name: 'List' }).click()
    const items = page.getByTestId('place-list').locator('li')
    await expect(items).toHaveCount(10)

    // test that the place shows as public
    // click the earth icon
    const item = items.filter({ hasText: places[5].data.name })
    await item.getByRole('button', { name: 'Privacy and sharing: Public' }).click()
    // select private
    await page.getByRole('radio', { name: 'Private' }).click()

    // click confirm
    await page.getByRole('button', { name: 'Confirm' }).click()
    // acl should get updated
    // and the lock icon changes to a lock
    await expect(item.getByRole('button', { name: 'Privacy and sharing: Private' })).toBeVisible()
    await expect(page.getByTestId('toast-container').getByRole('alert')).toHaveCount(2)
    // and the user is informed by toast that the place was made private
    await expect(page.getByTestId('toast-container').getByRole('alert').nth(0)).toContainText(
      'Access was updated to private',
    )
    // and the user is informed by toast that the public index was informed
    await expect(page.getByTestId('toast-container').getByRole('alert').nth(1)).toContainText(
      'Public geoindex was notified',
    )
  })

  // read
  test.fixme('see places shared with me', async () => {})
  test.fixme('see places shared publicly', async () => {})
  test.fixme('keep places in my local index', async () => {})
  test.fixme('clone places to my pod', async () => {})
})

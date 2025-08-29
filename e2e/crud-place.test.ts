import { expect, test } from '@playwright/test'
import { schema_https } from 'rdf-namespaces'
import { createRandomAccount, signIn } from './utils/account'
import { createRandomPlace } from './utils/place'
import { addRegistration, createTypeIndex, setContainerAcl } from './utils/profile'

test.beforeEach(async ({ context }) => {
  await context.route('**://www.wikidata.org/w/api.php?**', async (route) => {
    const url = new URL(route.request().url())

    try {
      switch (url.searchParams.get('action')) {
        case 'wbsearchentities': {
          await route.fulfill({
            status: 200,
            contentType: 'application/json; charset=utf-8',
            headers: { 'access-control-allow-origin': '*' },
            path: `e2e/fixtures/wikidata-search-${url.searchParams.get('search')}-${url.searchParams.get('language')}.json`,
          })
          break
        }

        case 'wbgetentities': {
          await route.fulfill({
            status: 200,
            contentType: 'application/json; charset=utf-8',
            headers: { 'access-control-allow-origin': '*' },
            path: `e2e/fixtures/wikidata-get-${url.searchParams.get('ids')}-${url.searchParams.get('languages')}.json`,
          })
          break
        }

        default: {
          throw new Error()
        }
      }
    } catch {
      await route.abort('failed')
      throw new Error('unstubbed wikidata request ' + url)
    }
  })
})

test.describe('C(R)UD place', () => {
  test.fixme('can create a place', async () => {})
  test('can update my place', async ({ page }) => {
    const account = await createRandomAccount()

    // create some places
    for (let i = 0, len = 10; i < len; ++i) await createRandomPlace(account, 'places/')

    const containerUri = new URL('places/', account.podUrl)
    await setContainerAcl(account, containerUri)
    const typeIndexUrl = await createTypeIndex(account)
    await addRegistration(account, typeIndexUrl, [schema_https.Place], [containerUri])

    await signIn(page, account)

    await page.getByRole('link', { name: 'List' }).click()
    const items = page.getByTestId('place-list').locator('li')
    await expect(items).toHaveCount(10)

    // click Edit icon
    await items.nth(3).getByRole('button', { name: 'Edit place' }).click()

    // a dialog with form opens

    await expect(page.getByRole('dialog')).toBeVisible()

    // I can update the place name, description, location
    await page.getByRole('textbox', { name: 'name' }).fill('New location name')
    await page.getByRole('textbox', { name: 'description' }).fill('New location description')

    // and hit save
    await page.getByRole('button', { name: 'Update place' }).click()
    // and info about successful update shows up
    await expect(page.getByTestId('toast-container').getByRole('alert')).toHaveCount(1)
    await expect(page.getByTestId('toast-container').getByRole('alert')).toContainText('Success')
    // and the place is updated
    await expect(items.nth(3)).toContainText('New location name')
    await expect(items.nth(3)).toContainText('New location description')
  })

  // maybe implement these as part of the general update, or separately
  test.fixme('update also location', () => {})
  test('update also topics (add and remove topics from wikidata)', async ({ page }) => {
    const account = await createRandomAccount()

    const places: Awaited<ReturnType<typeof createRandomPlace>>[] = []

    // create some places
    for (let i = 0, len = 8; i < len; ++i) places.push(await createRandomPlace(account, 'places/'))

    const containerUri = new URL('places/', account.podUrl)
    await setContainerAcl(account, containerUri)
    const typeIndexUrl = await createTypeIndex(account)
    await addRegistration(account, typeIndexUrl, [schema_https.Place], [containerUri])

    await signIn(page, account)

    await page.getByRole('link', { name: 'List' }).click()
    const items = page.getByTestId('place-list').locator('li')
    await expect(items).toHaveCount(8)

    // click Edit icon
    await items.nth(3).getByRole('button', { name: 'Edit place' }).click()

    // a dialog with form opens
    await expect(page.getByRole('dialog')).toBeVisible()

    // I can add and remove topics
    await page.getByRole('combobox', { name: 'Search topics' }).click()
    await page.getByRole('combobox', { name: 'Search topics' }).fill('universe')
    await page.getByRole('option', { name: 'Universe (Q1)', exact: true }).click()

    await page.getByRole('combobox', { name: 'Search topics' }).click()
    await page.getByRole('combobox', { name: 'Search topics' }).fill('earth')
    await page.getByRole('option', { name: 'Earth (Q2)', exact: true }).click()

    await page.getByRole('combobox', { name: 'Search topics' }).click()
    await page.getByRole('combobox', { name: 'Search topics' }).fill('life')
    await page.getByRole('option', { name: 'life (Q3)', exact: true }).click()

    // and hit save
    await page.getByRole('button', { name: 'Update place' }).click()
    // and info about successful update shows up
    await expect(page.getByTestId('toast-container').getByRole('alert')).toHaveCount(1)
    await expect(page.getByTestId('toast-container').getByRole('alert')).toContainText('Success')
    // and the place shows the topics
    await expect(items.nth(3).getByTestId('topic-tag')).toHaveCount(3)
  })

  test('can delete my place', async ({ page }) => {
    const account = await createRandomAccount()

    // first some places must exist, so create some places
    for (let i = 0, len = 10; i < len; ++i) await createRandomPlace(account, 'places/')

    const containerUri = new URL('places/', account.podUrl)
    await setContainerAcl(account, containerUri)
    const typeIndexUrl = await createTypeIndex(account)
    await addRegistration(account, typeIndexUrl, [schema_https.Place], [containerUri])

    await signIn(page, account)

    await page.getByRole('link', { name: 'List' }).click()
    const items = page.getByTestId('place-list').locator('li')
    await expect(items).toHaveCount(10)

    // prepare for confirm dialog confirmation
    page.on('dialog', async (dialog) => {
      await dialog.accept()
    })

    // then the list item must have a delete icon
    await items.nth(3).getByRole('button', { name: 'Delete place' }).click()

    // and if confirmed, delete the place
    // inform about the successful deletion
    await expect(page.getByTestId('toast-container').getByRole('alert')).toHaveCount(1)
    await expect(page.getByTestId('toast-container').getByRole('alert')).toContainText('Success')
    // then one of the places is not there anymore
    await expect(items).toHaveCount(9)
  })
})

import { expect, test } from '@playwright/test'
import { createRandomAccount, signIn } from './utils/account'
import { createRandomPlace } from './utils/place'

test.describe('C(R)UD place', () => {
  test.fixme('can create a place', async () => {})
  test('can update my place', async ({ page }) => {
    const account = await createRandomAccount()

    // create some places
    for (let i = 0, len = 10; i < len; ++i) {
      await createRandomPlace(account, 'places/')
    }

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
    // TODO update also location

    // and hit save
    await page.getByRole('button', { name: 'Update place' }).click()
    // and info about successful update shows up
    await expect(page.getByTestId('toast-container').getByRole('alert')).toHaveCount(1)
    await expect(page.getByTestId('toast-container').getByRole('alert')).toContainText('Success')
    // and the place is updated
    await expect(items.nth(3)).toContainText('New location name')
    await expect(items.nth(3)).toContainText('New location description')
  })

  test('can delete my place', async ({ page }) => {
    const account = await createRandomAccount()

    // first some places must exist, so create some places
    for (let i = 0, len = 10; i < len; ++i) {
      await createRandomPlace(account, 'places/')
    }

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

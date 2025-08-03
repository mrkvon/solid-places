import { expect, test } from '@playwright/test'
import { createRandomAccount, signIn } from './utils/account'
import { createRandomPlace } from './utils/place'

test.describe('C(R)UD place', () => {
  test.fixme('can create a place', async () => {})
  test.fixme('can update my place', async () => {})
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
    // then one of the places is not there anymore
    await expect(items).toHaveCount(9)
  })
})

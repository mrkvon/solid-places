import { expect, test } from '@playwright/test'
import { createRandomAccount, signIn } from './utils/account'
import { createRandomPlace } from './utils/place'

test.describe('List of Places', () => {
  test('can show places as a list', async ({ page }) => {
    const account = await createRandomAccount()
    // create some places
    for (let i = 0, len = 10; i < len; ++i) {
      await createRandomPlace(account, 'places/')
    }

    await signIn(page, account)
    await page.getByRole('link', { name: 'List' }).click()
    await expect(page.getByTestId('place-list').locator('li')).toHaveCount(10)
  })

  test.fixme('can filter places', () => {})
})

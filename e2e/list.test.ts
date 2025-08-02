import { expect, test } from '@playwright/test'
import { randomUUID } from 'node:crypto'
import { createRandomAccount, signIn } from './utils/account'
import { generatePlace } from './utils/place'

test.describe('List of Places', () => {
  test('can show places as a list', async ({ page }) => {
    const account = await createRandomAccount()
    // create some places
    for (let i = 0, len = 10; i < len; ++i) {
      const response = await account.fetch(
        new URL(`places/place-${randomUUID()}.ttl`, account.podUrl),
        {
          method: 'PUT',
          body: generatePlace(),
          headers: { 'content-type': 'text/turtle' },
        },
      )

      expect(response.ok).toBe(true)
    }

    await signIn(page, account)
    await page.getByRole('link', { name: 'List' }).click()
    await expect(page.getByTestId('place-list').locator('li')).toHaveCount(10)
  })

  test.fixme('can filter places', () => {})
})

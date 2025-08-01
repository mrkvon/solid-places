import { expect, test } from '@playwright/test'
import { createRandomAccount, signIn } from './utils/account'

test.describe('Solid auth', () => {
  test('sign in', async ({ page }) => {
    const account = await createRandomAccount()
    await signIn(page, account)
    await expect(page.getByRole('button', { name: 'User Menu' })).toBeVisible()
  })

  test('sign out', async ({ page }) => {
    const account = await createRandomAccount()
    await signIn(page, account)

    await page.getByRole('button', { name: 'User Menu' }).click()
    await page.getByRole('menuitem', { name: 'Sign out' }).click()
    await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible()
  })
})

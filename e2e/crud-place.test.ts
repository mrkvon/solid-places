import { test } from '@playwright/test'
import { createRandomAccount, signIn } from './utils/account'

test.describe('C(R)UD place', () => {
  test.fixme('can create a place', async () => {})
  test.fixme('can update my place', async () => {})
  test.fixme('can delete my place', async ({ page }) => {
    const account = await createRandomAccount()
    await signIn(page, account)

    // first some places must exist, so create some places

    // then the list item must have a delete icon
    // and the icon must work
  })
})

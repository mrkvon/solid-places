import { expect, Page } from '@playwright/test'
import { v7 } from 'css-authn'
import { randomUUID } from 'node:crypto'

export const createRandomAccount = async () => {
  const username = randomUUID()
  const password = 'correcthorsebatterystaples'

  const account = await v7.createAccount({
    username,
    password,
    email: username + '@example.local',
    provider: 'http://localhost:4000/',
  })

  const authenticatedFetch = async (...props: Parameters<typeof fetch>) => {
    const authFetch = await v7.getAuthenticatedFetch({
      ...account,
      provider: account.idp,
    })
    return authFetch(...props)
  }

  return { ...account, provider: account.idp, fetch: authenticatedFetch }
}

export type Account = Awaited<ReturnType<typeof createRandomAccount>>

export const signIn = async (
  page: Page,
  account: { email: string; password: string; idp: string },
) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Sign In' }).click()
  await page.getByRole('textbox', { name: 'Identity Provider' }).fill(account.idp)
  await page.getByRole('button', { name: 'Sign In' }).last().click()
  // try {
  //   await page.getByRole('button', { name: 'Use a different account' }).click({ timeout: 3000 })
  // } catch {
  //   //
  // }
  await page.getByRole('textbox', { name: 'Email' }).fill(account.email)
  await page.getByRole('textbox', { name: 'Password' }).fill(account.password)
  await page.getByRole('button', { name: 'Log in' }).click()
  await page.getByRole('button', { name: 'Authorize' }).click()
  await expect(page).toHaveURL('/')
}

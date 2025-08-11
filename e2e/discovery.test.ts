import { expect, test } from '@playwright/test'
import { schema_https } from 'rdf-namespaces'
import { createRandomAccount, signIn } from './utils/account'
import { createRandomPlace } from './utils/place'
import { addRegistration, createTypeIndex, setContainerAcl } from './utils/profile'

test.describe('discovery of places', () => {
  test('places are found via type index, independent of a fixed folder', async ({ page }) => {
    const account = await createRandomAccount()
    // create some places
    const container1 = 'places/'
    const container2 = 'anyplace/'
    const container3 = 'neverland/'

    for (let i = 0; i < 2; ++i) await createRandomPlace(account, container1)
    for (let i = 0; i < 3; ++i) await createRandomPlace(account, container2)
    for (let i = 0; i < 4; ++i) await createRandomPlace(account, container3)

    // make containers private
    for (const container of [container1, container2, container3]) {
      const uri = new URL(container, account.podUrl)
      await setContainerAcl(account, uri)
    }

    const typeIndexUrl = await createTypeIndex(account)
    await addRegistration(
      account,
      typeIndexUrl,
      [schema_https.Place],
      [container1, container2, container3].map((c) => new URL(c, account.podUrl)),
    )

    await signIn(page, account)
    await page.getByRole('link', { name: 'List' }).click()
    await expect(page.getByTestId('place-list').locator('li')).toHaveCount(9)
  })
})

import { faker } from '@faker-js/faker'
import { SolidContainerSlug } from '@ldo/connected-solid'
import { expect } from '@playwright/test'
import { randomUUID } from 'node:crypto'
import { dct, schema_https as schema, xsd } from 'rdf-namespaces'
import { createRandomAccount } from './account'

export const generatePlace = () => `
  <#place> a <${schema.Place}>;
  <${schema.geo}> [
    a <${schema.GeoCoordinates}>;
    <${schema.latitude}> ${faker.location.latitude()};
    <${schema.longitude}> ${faker.location.longitude()}
  ];
  <${schema.name}> "${faker.word.words()}";
  <${schema.description}> "${faker.word.words(15)}";
  <${dct.created}> "${faker.date.past().toISOString()}"^^<${xsd.dateTime}>.
`

export const createRandomPlace = async (
  account: Awaited<ReturnType<typeof createRandomAccount>>,
  containerSlug: SolidContainerSlug,
) => {
  const container = new URL(containerSlug, account.podUrl)

  const response = await account.fetch(new URL(`place-${randomUUID()}.ttl`, container), {
    method: 'PUT',
    body: generatePlace(),
    headers: { 'content-type': 'text/turtle' },
  })

  expect(response.ok).toBe(true)
}

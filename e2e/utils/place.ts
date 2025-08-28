import { faker } from '@faker-js/faker'
import { SolidContainerSlug } from '@ldo/connected-solid'
import { expect } from '@playwright/test'
import { randomUUID } from 'node:crypto'
import { dct, schema_https as schema, xsd } from 'rdf-namespaces'
import { createRandomAccount } from './account'

interface PlaceData {
  latitude: number
  longitude: number
  name: string
  description: string
  created: Date
}

const generateRandomPlaceData = (): PlaceData => ({
  latitude: faker.location.latitude(),
  longitude: faker.location.longitude(),
  name: faker.word.words(),
  description: faker.word.words(15),
  created: faker.date.past(),
})

const generatePlace = (data: PlaceData) => `
  <#place> a <${schema.Place}>;
  <${schema.geo}> [
    a <${schema.GeoCoordinates}>;
    <${schema.latitude}> ${data.latitude};
    <${schema.longitude}> ${data.longitude}
  ];
  <${schema.name}> "${data.name}";
  <${schema.description}> "${data.description}";
  <${dct.created}> "${data.created.toISOString()}"^^<${xsd.dateTime}>.
`

export const createRandomPlace = async (
  account: Awaited<ReturnType<typeof createRandomAccount>>,
  containerSlug: SolidContainerSlug,
) => {
  const container = new URL(containerSlug, account.podUrl)

  const url = new URL(`place-${randomUUID()}.ttl`, container)
  const uri = new URL(url)
  uri.hash = '#place'
  const data = generateRandomPlaceData()
  const turtle = generatePlace(data)

  const response = await account.fetch(url, {
    method: 'PUT',
    body: turtle,
    headers: { 'content-type': 'text/turtle' },
  })

  expect(response.ok).toBe(true)

  return { url, uri, data, turtle }
}

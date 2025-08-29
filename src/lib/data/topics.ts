import { HttpError } from '$lib/utils/errors'
import merge from 'lodash/merge'

export type URI = string

export type Topic = {
  id?: string
  uri: URI
  label?: string
  description?: string
  aliases: string[]
  image?: URI
  officialWebsite?: URI
}

interface WikidataSearchResult {
  search: {
    concepturi: URI
    label: string
    description: string
    photos: []
    aliases: string[]
  }[]
}

interface WikidataEntitiesResult {
  entities: {
    [key: string]: {
      labels: { [language: string]: { value: string } }
      descriptions: { [language: string]: { value: string } }
      aliases: { [language: string]: { value: string }[] }
      claims: {
        P18?: {
          mainsnak: {
            datavalue?: { value: string }
            datatype: 'commonsMedia'
          }
        }[]
        P154?: {
          mainsnak: {
            datavalue?: { value: string }
            datatype: 'commonsMedia'
          }
        }[]
        P856?: {
          mainsnak: {
            datavalue?: { value: string }
            datatype: 'url'
          }
        }[]
      }
    }
  }
}

export const searchInterests = async (query: string, language: string): Promise<Topic[]> => {
  if (query.trim().length === 0) return []
  const res = await fetch(
    `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(
      query,
    )}&language=${language}&limit=20&continue=0&format=json&uselang=${language}&type=item&origin=*`,
  )
  const data: WikidataSearchResult = await res.json()
  return data.search.map(({ concepturi, ...rest }) =>
    merge({ aliases: [], photos: [] }, { ...rest, uri: concepturi }),
  )
}

export const readInterest = async (uri: URI, language: string): Promise<Topic> => {
  const id = uri.match(wikidataRegex)?.[2] ?? ''

  // currently, we resolve only wikidata interests
  if (!id) throw new Error('Not a wikidata entity')

  const res = await fetch(
    `https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${id}&languages=${language}&format=json&origin=*`,
  )

  if (!res.ok) throw new HttpError('Fetching interest failed', res)

  const data: WikidataEntitiesResult = await res.json()

  if (!data || !data.entities) throw new Error('Not ')

  const entity = data.entities[id]

  if (!entity) throw new Error('Entity not found')

  const label = entity.labels[language]?.value
  const description = entity.descriptions[language]?.value
  const imageString = (entity.claims.P18 ?? []).map((p) => p.mainsnak.datavalue?.value)[0]
  const logoImageString = (entity.claims.P154 ?? []).map((p) => p.mainsnak.datavalue?.value)[0]
  const image =
    imageString &&
    `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(
      imageString,
    )}?width=300`

  const logoImage =
    logoImageString &&
    `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(
      logoImageString,
    )}?width=300`
  const officialWebsite = (entity.claims.P856 ?? []).map((p) => p.mainsnak.datavalue?.value)[0]
  const aliases = (entity.aliases[language] ?? []).map(({ value }) => value)

  return {
    id,
    uri,
    label,
    aliases,
    description,
    officialWebsite,
    image: logoImage || image,
  }
}

const wikidataRegex = /^https?:\/\/(w{3}\.)?wikidata\.org\/entity\/([A-Z0-9]*)\/?$/

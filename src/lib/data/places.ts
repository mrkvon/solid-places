import { dataset } from '$lib/ldoSvelte'
import { QueryAndStore, run, type RdfQuery } from '@ldhop/core'
import { Store } from 'n3'
import { ldp, rdf, rdfs, schema_https, solid, space } from 'rdf-namespaces'

enum Variable {
  preferencesFile = '?preferencesFile',
  person = '?person',
  profileDocument = '?profileDocument',
  publicTypeIndex = '?publicTypeIndex',
  privateTypeIndex = '?privateTypeIndex',
  inbox = '?inbox',
  typeRegistration = '?typeRegistration',
  placeRegistration = '?placeRegistration',
  placeContainer = '?placeContainer',
  placeResource = '?placeResource',
  place = '?place',
  extendedPlaceDocument = '?extendedPlaceDocument',
}

const personPlaceQuery: RdfQuery = [
  // find and fetch preferences file
  {
    type: 'match',
    subject: Variable.person,
    predicate: space.preferencesFile,
    pick: 'object',
    target: Variable.preferencesFile,
  },
  { type: 'add resources', variable: Variable.preferencesFile },
  // find extended profile documents
  {
    type: 'match',
    subject: Variable.person,
    predicate: rdfs.seeAlso,
    pick: 'object',
    target: Variable.profileDocument,
  },
  // fetch the extended profile documents
  { type: 'add resources', variable: Variable.profileDocument },
  // find public type index
  {
    type: 'match',
    subject: Variable.person,
    predicate: solid.publicTypeIndex,
    pick: 'object',
    target: Variable.publicTypeIndex,
  },
  // find private type index
  {
    type: 'match',
    subject: Variable.person,
    predicate: solid.privateTypeIndex,
    pick: 'object',
    target: Variable.privateTypeIndex,
  },
  { type: 'add resources', variable: Variable.privateTypeIndex },
  { type: 'add resources', variable: Variable.publicTypeIndex },
  // find inbox
  {
    type: 'match',
    subject: Variable.person,
    predicate: ldp.inbox,
    pick: 'object',
    target: Variable.inbox,
  },
  {
    type: 'match',
    predicate: rdf.type,
    object: solid.TypeRegistration,
    pick: 'subject',
    target: Variable.typeRegistration,
  },
  {
    type: 'match',
    subject: Variable.typeRegistration,
    predicate: solid.forClass,
    object: schema_https.Place,
    pick: 'subject',
    target: Variable.placeRegistration,
  },
  {
    type: 'match',
    subject: Variable.placeRegistration,
    predicate: solid.instanceContainer,
    pick: 'object',
    target: Variable.placeContainer,
  },
  {
    type: 'match',
    subject: Variable.placeContainer,
    predicate: ldp.contains,
    pick: 'object',
    target: Variable.placeResource,
  },
  {
    type: 'match',
    subject: Variable.placeRegistration,
    predicate: solid.instance,
    pick: 'object',
    target: Variable.placeResource,
  },
  { type: 'add resources', variable: Variable.placeResource },
  {
    type: 'match',
    predicate: rdf.type,
    object: schema_https.Place,
    pick: 'subject',
    target: Variable.place,
  },
  {
    type: 'match',
    subject: Variable.place,
    predicate: rdfs.seeAlso,
    pick: 'object',
    target: Variable.extendedPlaceDocument,
  },
  {
    type: 'add resources',
    variable: Variable.extendedPlaceDocument,
  },
]

export const runPlacesQuery = async (webId: string, fetch: typeof globalThis.fetch) => {
  // what we already have:

  const quads = new Store(dataset.toArray())

  const qas = new QueryAndStore(personPlaceQuery, { person: new Set([webId]) }, quads)
  await run(qas, fetch)

  console.log(qas.getAllVariables())

  dataset.addAll(qas.store)

  return qas
}

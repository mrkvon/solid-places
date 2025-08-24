import { dataset } from '$lib/ldoSvelte'
import { fetchRdfDocument, LdhopEngine, type LdhopQuery } from '@ldhop/core'
import { NamedNode, Store } from 'n3'
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
  placeResourceOrUri = '?placeResourceOrUri',
  placeResource = '?placeResource',
  place = '?place',
  extendedPlaceDocument = '?extendedPlaceDocument',
}

const personPlaceQuery: LdhopQuery<Variable> = [
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
    graph: Variable.publicTypeIndex,
    pick: 'subject',
    target: Variable.typeRegistration,
  },
  {
    type: 'match',
    predicate: rdf.type,
    object: solid.TypeRegistration,
    graph: Variable.privateTypeIndex,
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
    target: Variable.placeResourceOrUri,
  },
  // it should be a resource, but just in case.
  {
    type: 'transform variable',
    source: Variable.placeResourceOrUri,
    target: Variable.placeResource,
    transform: (term) => {
      if (term.termType === 'NamedNode') {
        const newUrl = new URL(term.id)
        newUrl.hash = ''
        return new NamedNode(newUrl.toString())
      }
    },
  },
  {
    type: 'match',
    predicate: rdf.type,
    object: schema_https.Place,
    graph: Variable.placeResource,
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

export const queryPlaces = async (webId: string, fetch: typeof globalThis.fetch) => {
  // what we already have:

  const quads = new Store(dataset.toArray())

  const qas = new LdhopEngine(personPlaceQuery, { [Variable.person]: new Set([webId]) }, quads)

  await executeQuery(qas, fetch, dataset)

  console.log(qas.getAllVariables())

  return qas
}

export const executeQuery = async (
  engine: LdhopEngine,
  fetch: typeof globalThis.fetch,
  ldoDataset: typeof dataset,
) => {
  let missingResources = engine.getGraphs(false)
  while (missingResources.size > 0) {
    const res = [...missingResources][0]
    try {
      const { data: quads, response } = await fetchRdfDocument(res, fetch)
      engine.addGraph(response?.url ?? res, quads, res)

      ldoDataset.addAll(quads)
    } catch (e) {
      // __eslint-disable-next-line no-console
      console.error(e)
      engine.addGraph(res, [])
    } finally {
      missingResources = engine.getGraphs(false)
    }
  }
}

import { faker } from '@faker-js/faker'
import { dct, schema_https as schema, xsd } from 'rdf-namespaces'

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

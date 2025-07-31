import { LdoJsonldContext } from "@ldo/ldo";

/**
 * =============================================================================
 * placeContext: JSONLD Context for place
 * =============================================================================
 */
export const placeContext: LdoJsonldContext = {
  type: {
    "@id": "@type",
    "@isCollection": true,
  },
  Place: {
    "@id": "https://schema.org/Place",
    "@context": {
      type: {
        "@id": "@type",
        "@isCollection": true,
      },
      name: {
        "@id": "https://schema.org/name",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
      description: {
        "@id": "https://schema.org/description",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
      geo: {
        "@id": "https://schema.org/geo",
        "@type": "@id",
      },
      topic: {
        "@id": "http://xmlns.com/foaf/0.1/topic",
        "@type": "@id",
        "@isCollection": true,
      },
      sameAs: {
        "@id": "http://www.w3.org/2002/07/owl#sameAs",
        "@type": "@id",
        "@isCollection": true,
      },
      seeAlsoseeAlso: {
        "@id": "http://www.w3.org/2000/01/rdf-schema#seeAlsoseeAlso",
        "@type": "@id",
        "@isCollection": true,
      },
      created: {
        "@id": "http://purl.org/dc/terms/created",
        "@type": "http://www.w3.org/2001/XMLSchema#dateTime",
      },
      modified: {
        "@id": "http://purl.org/dc/terms/modified",
        "@type": "http://www.w3.org/2001/XMLSchema#dateTime",
        "@isCollection": true,
      },
      creator: {
        "@id": "http://purl.org/dc/terms/creator",
        "@type": "@id",
      },
    },
  },
  name: {
    "@id": "https://schema.org/name",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  description: {
    "@id": "https://schema.org/description",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  geo: {
    "@id": "https://schema.org/geo",
    "@type": "@id",
  },
  GeoCoordinates: {
    "@id": "https://schema.org/GeoCoordinates",
    "@context": {
      type: {
        "@id": "@type",
        "@isCollection": true,
      },
      latitude: {
        "@id": "https://schema.org/latitude",
        "@type": "http://www.w3.org/2001/XMLSchema#decimal",
      },
      longitude: {
        "@id": "https://schema.org/longitude",
        "@type": "http://www.w3.org/2001/XMLSchema#decimal",
      },
    },
  },
  latitude: {
    "@id": "https://schema.org/latitude",
    "@type": "http://www.w3.org/2001/XMLSchema#decimal",
  },
  longitude: {
    "@id": "https://schema.org/longitude",
    "@type": "http://www.w3.org/2001/XMLSchema#decimal",
  },
  GeoShape: {
    "@id": "https://schema.org/GeoShape",
    "@context": {
      type: {
        "@id": "@type",
        "@isCollection": true,
      },
    },
  },
  polygon: {
    "@id": "https://schema.org/polygon",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  box: {
    "@id": "https://schema.org/box",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  circle: {
    "@id": "https://schema.org/circle",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  topic: {
    "@id": "http://xmlns.com/foaf/0.1/topic",
    "@type": "@id",
    "@isCollection": true,
  },
  sameAs: {
    "@id": "http://www.w3.org/2002/07/owl#sameAs",
    "@type": "@id",
    "@isCollection": true,
  },
  seeAlsoseeAlso: {
    "@id": "http://www.w3.org/2000/01/rdf-schema#seeAlsoseeAlso",
    "@type": "@id",
    "@isCollection": true,
  },
  created: {
    "@id": "http://purl.org/dc/terms/created",
    "@type": "http://www.w3.org/2001/XMLSchema#dateTime",
  },
  modified: {
    "@id": "http://purl.org/dc/terms/modified",
    "@type": "http://www.w3.org/2001/XMLSchema#dateTime",
    "@isCollection": true,
  },
  creator: {
    "@id": "http://purl.org/dc/terms/creator",
    "@type": "@id",
  },
};

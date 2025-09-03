import { LdoJsonldContext } from '@ldo/ldo'

/**
 * =============================================================================
 * solidProfileContext: JSONLD Context for solidProfile
 * =============================================================================
 */
export const solidProfileContext: LdoJsonldContext = {
  type: {
    '@id': '@type',
    '@isCollection': true,
  },
  Person: {
    '@id': 'http://xmlns.com/foaf/0.1/Person',
    '@context': {
      type: {
        '@id': '@type',
        '@isCollection': true,
      },
      inbox: {
        '@id': 'http://www.w3.org/ns/ldp#inbox',
        '@type': '@id',
      },
      preferencesFile: {
        '@id': 'http://www.w3.org/ns/pim/space#preferencesFile',
        '@type': '@id',
      },
      storage: {
        '@id': 'http://www.w3.org/ns/pim/space#storage',
        '@type': '@id',
        '@isCollection': true,
      },
      account: {
        '@id': 'http://www.w3.org/ns/solid/terms#account',
        '@type': '@id',
      },
      privateTypeIndex: {
        '@id': 'http://www.w3.org/ns/solid/terms#privateTypeIndex',
        '@type': '@id',
        '@isCollection': true,
      },
      publicTypeIndex: {
        '@id': 'http://www.w3.org/ns/solid/terms#publicTypeIndex',
        '@type': '@id',
        '@isCollection': true,
      },
      oidcIssuer: {
        '@id': 'http://www.w3.org/ns/solid/terms#oidcIssuer',
        '@type': '@id',
        '@isCollection': true,
      },
    },
  },
  inbox: {
    '@id': 'http://www.w3.org/ns/ldp#inbox',
    '@type': '@id',
  },
  preferencesFile: {
    '@id': 'http://www.w3.org/ns/pim/space#preferencesFile',
    '@type': '@id',
  },
  storage: {
    '@id': 'http://www.w3.org/ns/pim/space#storage',
    '@type': '@id',
    '@isCollection': true,
  },
  account: {
    '@id': 'http://www.w3.org/ns/solid/terms#account',
    '@type': '@id',
  },
  privateTypeIndex: {
    '@id': 'http://www.w3.org/ns/solid/terms#privateTypeIndex',
    '@type': '@id',
    '@isCollection': true,
  },
  TypeIndex: {
    '@id': 'http://www.w3.org/ns/solid/terms#TypeIndex',
    '@context': {
      type: {
        '@id': '@type',
        '@isCollection': true,
      },
    },
  },
  ListedDocument: {
    '@id': 'http://www.w3.org/ns/solid/terms#ListedDocument',
    '@context': {
      type: {
        '@id': '@type',
        '@isCollection': true,
      },
    },
  },
  UnlistedDocument: {
    '@id': 'http://www.w3.org/ns/solid/terms#UnlistedDocument',
    '@context': {
      type: {
        '@id': '@type',
        '@isCollection': true,
      },
    },
  },
  publicTypeIndex: {
    '@id': 'http://www.w3.org/ns/solid/terms#publicTypeIndex',
    '@type': '@id',
    '@isCollection': true,
  },
  oidcIssuer: {
    '@id': 'http://www.w3.org/ns/solid/terms#oidcIssuer',
    '@type': '@id',
    '@isCollection': true,
  },
  TypeRegistration: {
    '@id': 'http://www.w3.org/ns/solid/terms#TypeRegistration',
    '@context': {
      type: {
        '@id': '@type',
        '@isCollection': true,
      },
      forClass: {
        '@id': 'http://www.w3.org/ns/solid/terms#forClass',
        '@type': '@id',
        '@isCollection': true,
      },
      instance: {
        '@id': 'http://www.w3.org/ns/solid/terms#instance',
        '@type': '@id',
        '@isCollection': true,
      },
      instanceContainer: {
        '@id': 'http://www.w3.org/ns/solid/terms#instanceContainer',
        '@type': '@id',
        '@isCollection': true,
      },
    },
  },
  forClass: {
    '@id': 'http://www.w3.org/ns/solid/terms#forClass',
    '@type': '@id',
    '@isCollection': true,
  },
  instance: {
    '@id': 'http://www.w3.org/ns/solid/terms#instance',
    '@type': '@id',
    '@isCollection': true,
  },
  instanceContainer: {
    '@id': 'http://www.w3.org/ns/solid/terms#instanceContainer',
    '@type': '@id',
    '@isCollection': true,
  },
}

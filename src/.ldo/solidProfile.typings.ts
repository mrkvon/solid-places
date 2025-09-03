import { LdoJsonldContext, LdSet } from '@ldo/ldo'

/**
 * =============================================================================
 * Typescript Typings for solidProfile
 * =============================================================================
 */

/**
 * SolidProfile Type
 */
export interface SolidProfile {
  '@id'?: string
  '@context'?: LdoJsonldContext
  /**
   * Defines the node as a Person (from foaf)
   */
  type: LdSet<{
    '@id': 'Person'
  }>
  /**
   * The user's LDP inbox to which apps can post notifications
   */
  inbox?: {
    '@id': string
  }
  /**
   * The user's preferences
   */
  preferencesFile?: {
    '@id': string
  }
  /**
   * The location of a Solid storage server related to this WebId
   */
  storage?: LdSet<{
    '@id': string
  }>
  /**
   * The user's account
   */
  account?: {
    '@id': string
  }
  /**
   * A registry of all types used on the user's Pod (for private access only)
   */
  privateTypeIndex?: LdSet<TypeIndex>
  /**
   * A registry of all types used on the user's Pod (for public access)
   */
  publicTypeIndex?: LdSet<TypeIndex>
  /**
   * Solid OIDC issuer for a webId.
   */
  oidcIssuer: LdSet<{
    '@id': string
  }>
}

/**
 * TypeIndex Type
 */
export interface TypeIndex {
  '@id'?: string
  '@context'?: LdoJsonldContext
  type?: LdSet<
    | {
        '@id': 'TypeIndex'
      }
    | {
        '@id': 'ListedDocument'
      }
    | {
        '@id': 'UnlistedDocument'
      }
  >
}

/**
 * TypeRegistration Type
 */
export interface TypeRegistration {
  '@id'?: string
  '@context'?: LdoJsonldContext
  type: LdSet<{
    '@id': 'TypeRegistration'
  }>
  forClass: LdSet<{
    '@id': string
  }>
  instance?: LdSet<{
    '@id': string
  }>
  instanceContainer?: LdSet<{
    '@id': string
  }>
}

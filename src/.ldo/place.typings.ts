import { LdoJsonldContext, LdSet } from "@ldo/ldo";

/**
 * =============================================================================
 * Typescript Typings for place
 * =============================================================================
 */

/**
 * Place Type
 */
export interface Place {
  "@id"?: string;
  "@context"?: LdoJsonldContext;
  type: LdSet<{
    "@id": "Place";
  }>;
  name: string;
  description?: string;
  geo: GeoCoordinates | GeoShape;
  topic?: LdSet<{
    "@id": string;
  }>;
  sameAs?: LdSet<{
    "@id": string;
  }>;
  seeAlsoseeAlso?: LdSet<{
    "@id": string;
  }>;
  created?: string;
  modified?: LdSet<string>;
  creator?: {
    "@id": string;
  };
}

/**
 * GeoCoordinates Type
 */
export interface GeoCoordinates {
  "@id"?: string;
  "@context"?: LdoJsonldContext;
  type: LdSet<{
    "@id": "GeoCoordinates";
  }>;
  latitude: number;
  longitude: number;
}

/**
 * GeoShape Type
 */
export interface GeoShape {
  "@id"?: string;
  "@context"?: LdoJsonldContext;
  type: LdSet<{
    "@id": "GeoShape";
  }>;
}

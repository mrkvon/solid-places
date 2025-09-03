import { ShapeType } from '@ldo/ldo'
import { placeSchema } from './place.schema'
import { placeContext } from './place.context'
import { Place, GeoCoordinates, GeoShape } from './place.typings'

/**
 * =============================================================================
 * LDO ShapeTypes place
 * =============================================================================
 */

/**
 * Place ShapeType
 */
export const PlaceShapeType: ShapeType<Place> = {
  schema: placeSchema,
  shape: 'https://ldo.js.org/Place',
  context: placeContext,
}

/**
 * GeoCoordinates ShapeType
 */
export const GeoCoordinatesShapeType: ShapeType<GeoCoordinates> = {
  schema: placeSchema,
  shape: 'https://ldo.js.org/GeoCoordinates',
  context: placeContext,
}

/**
 * GeoShape ShapeType
 */
export const GeoShapeShapeType: ShapeType<GeoShape> = {
  schema: placeSchema,
  shape: 'https://ldo.js.org/GeoShape',
  context: placeContext,
}

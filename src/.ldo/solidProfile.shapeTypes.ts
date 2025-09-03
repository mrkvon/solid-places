import { ShapeType } from '@ldo/ldo'
import { solidProfileSchema } from './solidProfile.schema'
import { solidProfileContext } from './solidProfile.context'
import { SolidProfile, TypeIndex, TypeRegistration } from './solidProfile.typings'

/**
 * =============================================================================
 * LDO ShapeTypes solidProfile
 * =============================================================================
 */

/**
 * SolidProfile ShapeType
 */
export const SolidProfileShapeType: ShapeType<SolidProfile> = {
  schema: solidProfileSchema,
  shape: 'https://example.com/shapes#SolidProfile',
  context: solidProfileContext,
}

/**
 * TypeIndex ShapeType
 */
export const TypeIndexShapeType: ShapeType<TypeIndex> = {
  schema: solidProfileSchema,
  shape: 'https://example.com/shapes#TypeIndex',
  context: solidProfileContext,
}

/**
 * TypeRegistration ShapeType
 */
export const TypeRegistrationShapeType: ShapeType<TypeRegistration> = {
  schema: solidProfileSchema,
  shape: 'https://example.com/shapes#TypeRegistration',
  context: solidProfileContext,
}

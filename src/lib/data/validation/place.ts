import z from 'zod'

export const placeSchema = z.object({
  name: z.string().trim().nonempty(),
  description: z.string().optional(),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  topics: z.array(z.url()),
})

export type PlaceData = z.infer<typeof placeSchema>

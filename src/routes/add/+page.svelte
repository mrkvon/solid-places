<script lang="ts">
  import { goto } from '$app/navigation'
  import PlaceForm from '$lib/components/place-form.svelte'
  import type { PlaceData } from '$lib/data/validation/place'
  import { useLdo } from '$lib/ldoSvelte'
  import { storages } from '$lib/stores/storages'
  import { set } from '@ldo/ldo'
  import { PlaceShapeType } from '../../.ldo/place.shapeTypes'

  const { createData, commitData } = useLdo()

  const onsubmit = async (formData: PlaceData) => {
    const storage = $storages[0]
    if (!storage) throw new Error('no storage')
    const childResult = await storage.createChildIfAbsent('places/')
    if (childResult.isError) throw childResult
    const placeResult = await childResult.resource.createChildIfAbsent(
      `place-${crypto.randomUUID()}.ttl`,
    )
    if (placeResult.isError) throw placeResult
    const place = createData(PlaceShapeType, placeResult.uri + '#place', placeResult.resource)

    place.type = set({ '@id': 'Place' })
    place.geo = {
      type: set({ '@id': 'GeoCoordinates' }),
      latitude: formData.latitude!,
      longitude: formData.longitude!,
    }
    place.name = formData.name
    if (formData.description) place.description = formData.description
    place.topic = set(...formData.topics.map((t) => ({ ['@id']: t })))

    await commitData(place)

    goto('list')
  }
</script>

{#snippet submit()}Add place{/snippet}
<PlaceForm place={{}} {submit} {onsubmit} />

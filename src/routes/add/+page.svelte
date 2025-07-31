<script lang="ts">
  import { goto } from '$app/navigation'
  import { dataset, useLdo } from '$lib/ldoSvelte'
  import { session } from '$lib/stores/session'
  import { getStorageFromWebId, type SolidContainer, type SolidLeafUri } from '@ldo/connected-solid'
  import { set } from '@ldo/ldo'
  import { PlaceShapeType } from '../../.ldo/place.shapeTypes'

  interface FormData {
    name: string
    description: string
    latitude: number | null
    longitude: number | null
  }

  const defaultData: FormData = { name: '', description: '', latitude: null, longitude: null }
  let formData = defaultData

  let storages: SolidContainer[] = []

  const { createData, commitData } = useLdo()

  $: if ($session.info.webId) {
    getStorageFromWebId($session.info.webId as SolidLeafUri, dataset).then(
      (storageContainerResult) => {
        if (!storageContainerResult.isError) {
          storages = storageContainerResult.storageContainers
        }
      },
    )
  }

  const onSubmit = async (event: SubmitEvent) => {
    event.preventDefault()

    const storage = storages[0]
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

    await commitData(place)

    formData = defaultData
    goto('list')
  }
</script>

<form onsubmit={onSubmit}>
  <input type="text" placeholder="name" bind:value={formData.name} required />
  <textarea placeholder="description" name="description" bind:value={formData.description}
  ></textarea>
  <input
    type="number"
    step="any"
    id="latitude"
    name="latitude"
    placeholder="latitude"
    bind:value={formData.latitude}
    required
  />
  <input
    type="number"
    step="any"
    name="longitude"
    placeholder="longitude"
    bind:value={formData.longitude}
    required
  />
  <input type="submit" value="Add place" disabled={storages.length === 0} />
</form>

<pre>{JSON.stringify(formData, null, 2)}</pre>

<style>
  form {
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
</style>

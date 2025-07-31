<script lang="ts">
  import PlaceMap from '$lib/place-map.svelte'
  import type { Geometry } from 'geojson'
  import { type Snippet } from 'svelte'
  import type { GeoCoordinates, Place } from '../../.ldo/place.typings'

  const { place, children }: { place: Place; children?: Snippet } = $props()

  const coordinates = place.geo as GeoCoordinates

  const geometry: Geometry = {
    type: 'Point',
    coordinates: [coordinates.longitude, coordinates.latitude],
  }
</script>

<div class="place">
  <PlaceMap {geometry} --width="120px" --height="120px" />
  <div class="info">
    <date>{place.created}</date>
    <header>{place.name}</header>
    <p>{place.description}</p>
  </div>
  <div>
    {@render children?.()}
  </div>
</div>

<style lang="scss">
  .place {
    padding: 0.5rem;
    background-color: white;
    display: flex;
    gap: 0.5rem;
  }

  .info {
    flex: auto;
    header {
      font-weight: bold;
    }
  }
</style>

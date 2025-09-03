<script lang="ts">
  import { browser } from '$app/environment'
  import type { Geometry } from 'geojson'
  import type { LatLngTuple } from 'leaflet'
  import { onMount } from 'svelte'

  const { geometry }: { geometry: Geometry } = $props()

  const center: LatLngTuple = $derived(
    geometry.type === 'Point' ? [geometry.coordinates[1], geometry.coordinates[0]] : [51, 0],
  )

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let Map = $state<any>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let Marker = $state<any>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let TileLayer = $state<any>(null)

  onMount(async () => {
    if (!browser) return
    const sveaflet = await import('sveaflet')
    Map = sveaflet.Map
    Marker = sveaflet.Marker
    TileLayer = sveaflet.TileLayer
  })
</script>

{#if Map && TileLayer}
  <div class="map-container">
    <Map options={{ center, zoom: 13, zoomControl: false, scrollWheelZoom: 'center' }}>
      <TileLayer
        url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'}
        options={{
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OSM</a>',
        }}
      />
      {#if geometry.type === 'Point' && Marker}
        <Marker latLng={[geometry.coordinates[1], geometry.coordinates[0]]} />
      {/if}
    </Map>
  </div>
{/if}

<style>
  .map-container {
    width: var(--width, 100%);
    height: var(--height, 100%);
  }
</style>

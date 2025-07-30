<script lang="ts">
  import { useMatchSubject } from '$lib/ldoSvelte'
  import { placeResources } from '$lib/stores/places'
  import 'leaflet/dist/leaflet.css'
  import { rdf, schema_https } from 'rdf-namespaces'
  import { onDestroy, onMount } from 'svelte'
  import { PlaceShapeType } from '../../.ldo/place.shapeTypes'
  import { type GeoCoordinates } from '../../.ldo/place.typings'

  $: $placeResources

  let L: typeof import('leaflet')
  let map: L.Map
  let mapElement: HTMLDivElement
  let lat = 60
  let lng = 20
  let zoom = 15

  onMount(async () => {
    L = (await import('leaflet')).default
    await import('leaflet/dist/leaflet.css')
    // Create the map
    map = L.map(mapElement).setView([lat, lng], zoom)

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)
  })

  onDestroy(() => {
    if (map) {
      map.remove()
    }
  })

  const places = useMatchSubject(PlaceShapeType, rdf.type, schema_https.Place)

  $: if (L && map && $places.size > 0) {
    let minLat = Infinity
    let minLon = Infinity
    let maxLat = -Infinity
    let maxLon = -Infinity

    $places.forEach((place) => {
      if (place.geo.type.some((t) => t['@id'] === 'GeoCoordinates')) {
        const geo = place.geo as GeoCoordinates
        minLat = Math.min(minLat, geo.latitude)
        maxLat = Math.max(maxLat, geo.latitude)
        minLon = Math.min(minLon, geo.longitude)
        maxLon = Math.max(maxLon, geo.longitude)

        const markerPopup = `<div><strong>${place.name}</strong></div><div>${place.description}</div>`

        L.marker([geo.latitude, geo.longitude]).addTo(map).bindPopup(markerPopup)
      }
    })

    const bounds = new L.LatLngBounds([minLat, minLon], [maxLat, maxLon])

    const paddedBounds = bounds.pad(0.1)

    if (!map.getBounds().contains(bounds)) map.fitBounds(paddedBounds)
  }
</script>

<div bind:this={mapElement} class={['leaflet-container', 'map']}></div>

<style>
  .map {
    height: 100%;
    width: 100vw;
    overflow: hidden;
  }
</style>

<script lang="ts">
  import { Map, TileLayer, Marker, Popup, DivIcon } from 'sveaflet';
  import * as L from 'leaflet';

  import { poiTypeToSvg } from '$lib/icon';

  import { addLocation, getLocations, onTypeChange, onColorChange } from '$lib/database.js';

  import PoiEditor from './PoiEditor.svelte';

  const { data } = $props();

  const bounds = L.latLngBounds(L.latLng(0, 256), L.latLng(-256, 0));
  const maxBounds = bounds.pad(0.1);

  let map: L.Map | undefined = $state();

  let mapType = $derived(data.map.name);

  const mapOptions = {
    crs: L.CRS.Simple,
    zoom: 1,
    center: L.latLng(128, 128),
    maxBounds: maxBounds
  };

  const tileLayerOptions = {
    minZoom: 1,
    maxZoom: 4,
    bounds
  };

  let locations = $derived.by(() => {
    // Need to use `mapType` out of liveQuery scope to be reactive to it
    return getLocations(mapType);
  });

  const onClickMap = (e: L.LeafletMouseEvent) => {
    const latlng = e.latlng;
    if (!bounds.contains(latlng)) {
      return;
    }

    addLocation(latlng.lat, latlng.lng, mapType);
  };

  $effect(() => {
    map?.on('click', onClickMap);
  });
</script>

<div style="width: 100%; height: 100%;">
  <Map options={mapOptions} bind:instance={map}>
    <TileLayer url={`/map/${data.map.name}/{z}/{x}/{y}.jpg`} options={tileLayerOptions} />
    {#each $locations as location}
      <Marker latLng={L.latLng(location.lat, location.lng)}>
        {#key `${location.type}:${location.color}`}
          <DivIcon
            options={{
              html: poiTypeToSvg[location.type],
              className: `poi-icon-${location.color}`,
              iconSize: [36, 36],
              iconAnchor: [18, 18],
              popupAnchor: [0, -18]
            }}
          />
        {/key}

        <Popup>
          <PoiEditor
            type={location.type}
            color={location.color}
            onTypeChange={(t) => onTypeChange(t, location.id)}
            onColorChange={(c) => onColorChange(c, location.id)}
          />
        </Popup>
      </Marker>
    {/each}
  </Map>
</div>

<style lang="scss">
  @use '~styles/variables';

  div :global {
    .leaflet-container {
      background-color: #111;
    }

    @each $color, $value in variables.$colors {
      .poi-icon-#{$color} {
        fill: $value;
      }
    }
  }
</style>

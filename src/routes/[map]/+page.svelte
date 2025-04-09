<script lang="ts">
  import { Map, TileLayer } from 'sveaflet';
  import * as L from 'leaflet';

  const { data } = $props();

  const bounds = L.latLngBounds(L.latLng(0, 256), L.latLng(-256, 0));
  const maxBounds = bounds.pad(0.1);

  let map: L.Map | undefined = $state();

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
</script>

<div style="width: 100%; height: 100%;">
  <Map options={mapOptions} bind:instance={map}>
    <TileLayer url={`/map/${data.map.name}/{z}/{x}/{y}.jpg`} options={tileLayerOptions} />
  </Map>
</div>

<style>
  /* stylelint-disable-next-line selector-pseudo-class-no-unknown */
  :global(.leaflet-container) {
    background-color: #111;
  }
</style>

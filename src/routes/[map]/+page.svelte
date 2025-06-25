<script lang="ts">
  import { Map, TileLayer, Marker, DivIcon } from 'sveaflet';
  import * as L from 'leaflet';
  import { fly } from 'svelte/transition';

  import { poiTypeToSvg } from '$lib/icon';

  import {
    addLocation,
    getLocations,
    updateType,
    updateColor,
    updateLabel,
  } from '$lib/database.js';

  import PoiEditor from './PoiEditor.svelte';

  import type { LocationEntity } from '$lib/database.js';

  const { data } = $props();

  const bounds = L.latLngBounds(L.latLng(0, 256), L.latLng(-256, 0));
  const maxBounds = bounds.pad(0.12);

  let map: L.Map | undefined = $state();

  let mapType = $derived(data.map.name);
  let currentMapType = data.map.name;

  const mapOptions = {
    crs: L.CRS.Simple,
    zoom: 1,
    center: L.latLng(128, 128),
    maxBounds: maxBounds,
  };

  const tileLayerOptions = {
    minZoom: 1,
    maxZoom: 4,
    bounds,
  };

  let locations = $derived.by(() => {
    // Need to use `mapType` out of liveQuery scope to be reactive to it
    return getLocations(mapType);
  });

  let selectedLocation = $state<LocationEntity | null>(null);
  let popup = $state<L.Popup | null>(null);

  const onClickMap = (e: L.LeafletMouseEvent) => {
    const latlng = e.latlng;
    if (!bounds.contains(latlng)) {
      return;
    }

    addLocation(latlng.lat, latlng.lng, mapType);
  };

  const onTypeChange = (type: LocationEntity['type']) => {
    if (selectedLocation) {
      updateType(type, selectedLocation.id);

      selectedLocation = { ...selectedLocation, type };
    }
  };

  const onColorChange = (color: LocationEntity['color']) => {
    if (selectedLocation) {
      updateColor(color, selectedLocation.id);

      selectedLocation = { ...selectedLocation, color };
    }
  };

  const onChangeLabel = (label: string) => {
    if (selectedLocation) {
      updateLabel(label, selectedLocation.id);

      selectedLocation.label = label;

      if (popup) {
        popup.setContent(`<h3>${label}</h3>`);
      }
    }
  };

  const onMarkerClick = (location: LocationEntity) => {
    selectedLocation = location;

    popup = L.popup(L.latLng(location.lat, location.lng), {
      content: `<h3>${location.label}</h3>`,
      offset: L.point(0, -10),
    }).openOn(map!);
  };

  const closeEditor = () => {
    selectedLocation = null;
    popup?.remove();
  };

  $effect(() => {
    map?.on('click', onClickMap);
  });

  $effect(() => {
    popup?.on('remove', () => {
      selectedLocation = null;
    });
  });

  $effect(() => {
    if (mapType !== currentMapType) {
      selectedLocation = null;
      popup?.remove();
      currentMapType = mapType;
    }
  });
</script>

<div style="width: 100%; height: 100%;">
  <Map options={mapOptions} bind:instance={map}>
    <TileLayer url={`/map/${data.map.name}/{z}/{x}/{y}.jpg`} options={tileLayerOptions} />
    {#each $locations as location}
      <Marker latLng={L.latLng(location.lat, location.lng)} onclick={() => onMarkerClick(location)}>
        {#key `${location.type}:${location.color}`}
          <DivIcon
            options={{
              html: poiTypeToSvg[location.type],
              className: `poi-icon-${location.color}`,
              iconSize: [36, 36],
              iconAnchor: [18, 18],
            }}
          />
        {/key}
      </Marker>
    {/each}
  </Map>

  {#if selectedLocation}
    <div class="editor-sidebar" transition:fly={{ x: 300 }}>
      <button class="close-btn" onclick={closeEditor}>×</button>
      <PoiEditor
        type={selectedLocation.type}
        color={selectedLocation.color}
        label={selectedLocation.label}
        onTypeChange={(t) => onTypeChange(t)}
        onColorChange={(c) => onColorChange(c)}
        onChangeLabel={(label) => onChangeLabel(label)}
      />
    </div>
  {/if}
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

  .editor-sidebar {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
    height: calc(100% - 24px);
    padding: 1rem;
    overflow: hidden auto;
    color: #fff;
    background: #222;
    box-shadow: -2px 0 8px rgb(0 0 0 / 0.2);
  }

  .close-btn {
    align-self: flex-end;
    margin-bottom: 1rem;
    font-size: 2rem;
    color: #fff;
    cursor: pointer;
    background: none;
    border: none;
  }
</style>

import Dexie, { type EntityTable } from 'dexie';

import type { PoiType } from '$lib/icon';
import type { MapType } from '$lib/data';

const colors = [
  'white',
  'gray',
  'black',
  'blue',
  'green',
  'yellow',
  'orange',
  'red',
  'pink',
  'purple',
];

type IconColor = (typeof colors)[number];

interface PoiLocation {
  lat: number;
  lng: number;
  type: PoiType;
  color: IconColor;
}

interface LocationEntity extends PoiLocation {
  id: number;
  map: MapType;
}

const db = new Dexie('IcarusPoiDatabase') as Dexie & {
  locations: EntityTable<LocationEntity, 'id'>;
};

db.version(1).stores({
  locations: '++id, map',
});

async function addLocation(lat: number, lng: number, map: MapType) {
  try {
    await db.locations.add({
      map,
      lat,
      lng,
      type: 'pickaxe',
      color: 'white',
    });
  } catch (error) {
    console.error('Error adding location:', error);
  }
}

function getLocations(map: MapType) {
  return Dexie.liveQuery(() => db.locations.where('map').equals(map).toArray());
}

function onTypeChange(type: PoiType, id: LocationEntity['id']) {
  db.locations.update(id, { type }).catch((error) => {
    console.error('Error updating location type:', error);
  });
}

function onColorChange(color: IconColor, id: LocationEntity['id']) {
  db.locations.update(id, { color }).catch((error) => {
    console.error('Error updating location color:', error);
  });
}

export type { PoiLocation, LocationEntity, IconColor };
export { db, colors };
export { addLocation, getLocations, onTypeChange, onColorChange };

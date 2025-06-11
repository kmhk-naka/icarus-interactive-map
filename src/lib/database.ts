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
  label: string;
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
      label: 'Location',
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

function updateType(type: PoiType, id: LocationEntity['id']) {
  db.locations.update(id, { type }).catch((error) => {
    console.error('Error updating location type:', error);
  });
}

function updateColor(color: IconColor, id: LocationEntity['id']) {
  db.locations.update(id, { color }).catch((error) => {
    console.error('Error updating location color:', error);
  });
}
function updateLabel(label: string, id: LocationEntity['id']) {
  db.locations.update(id, { label }).catch((error) => {
    console.error('Error updating location label:', error);
  });
}

export type { PoiLocation, LocationEntity, IconColor };
export { db, colors };
export { addLocation, getLocations, updateType, updateColor, updateLabel };

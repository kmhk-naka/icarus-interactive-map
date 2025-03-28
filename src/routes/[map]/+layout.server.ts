import { maps } from '$lib/data';
import { error } from '@sveltejs/kit';

export function load({ params }) {
  const map = maps.find((map) => map.path === params.map);

  if (!map) error(404, 'Map not found!');

  return {
    map,
    maps
  };
}

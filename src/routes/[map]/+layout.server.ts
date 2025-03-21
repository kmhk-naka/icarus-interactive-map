import { maps } from '$lib/data';

export function load({ params }) {
	return {
		map: params.map,
		maps
	};
}

export const maps = [
  { name: 'Olympus', path: 'olympus' },
  { name: 'Styx', path: 'styx' }
] as const;

export type MapType = (typeof maps)[number]['name'];

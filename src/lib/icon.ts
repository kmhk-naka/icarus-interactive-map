const poiTypes = ['campfire', 'cave', 'ore-deposit', 'pickaxe'];

type PoiType = (typeof poiTypes)[number];

const poiTypeToSvg: Record<PoiType, string> = {};
poiTypes.forEach((type: PoiType) => {
  fetch(`/icons/${type}.svg`)
    .then((res) => res.text())
    .then((svgIcon) => {
      poiTypeToSvg[type] = svgIcon;
    });
});

export { poiTypes, poiTypeToSvg };
export type { PoiType };

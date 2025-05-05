<script lang="ts">
  import { colors, type IconColor } from '$lib/database';
  import { poiTypes, poiTypeToSvg, type PoiType } from '$lib/icon';

  type Props = {
    type: PoiType;
    color: IconColor;
    onTypeChange: (type: PoiType) => void;
    onColorChange: (color: IconColor) => void;
  };

  let { type, color, onTypeChange, onColorChange }: Props = $props();
</script>

<h2 class="title">Icon</h2>

<div class="icon-picker">
  {#each poiTypes as t}
    <button aria-label={t} aria-current={t === type} onclick={() => onTypeChange(t)}>
      <div class={`icon-color-${color}`}>
        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
        {@html poiTypeToSvg[t]}
      </div>
    </button>
  {/each}
</div>

<h2 class="title">Color</h2>

<div class="color-picker">
  {#each colors as c}
    <button aria-label={c} aria-current={c === color} onclick={() => onColorChange(c)}>
      <div class={`icon-color-${c}`}>
        <svg width="36" height="36" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50%" cy="50%" r="18" />
        </svg>
      </div>
    </button>
  {/each}
</div>

<style lang="scss">
  @use '~styles/variables';

  $color-light-green: #c0d29b;

  .title {
    width: 100%;
    margin: 8px 0;
    padding: 2px 4px;
    background-color: $color-light-green;

    &:not(:first-of-type) {
      margin-top: 24px;
    }
  }

  .icon-picker,
  .color-picker {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
    width: 266px;
    gap: 4px;

    > button {
      width: 50px;
      height: 50px;
      padding: 4px;
      border: none;
      background: transparent;
      background-color: #4b5141;
      cursor: pointer;

      &[aria-current='true'] {
        border: solid 2px $color-light-green;
      }

      > div :global(svg) {
        width: 36px;
        height: 36px;
        fill: black;
        background: transparent;
        transform: translateY(2px);
      }

      @each $color, $value in variables.$colors {
        .icon-color-#{$color} :global(svg) {
          fill: $value;
        }
      }
    }
  }
</style>

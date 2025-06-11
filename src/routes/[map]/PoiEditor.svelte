<script lang="ts">
  import { colors, type IconColor } from '$lib/database';
  import { poiTypes, poiTypeToSvg, type PoiType } from '$lib/icon';

  type Props = {
    type: PoiType;
    color: IconColor;
    label: string;
    onTypeChange: (type: PoiType) => void;
    onColorChange: (color: IconColor) => void;
    onChangeLabel: (label: string) => void;
  };

  let { type, color, label, onTypeChange, onColorChange, onChangeLabel }: Props = $props();
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

<h2 class="title">Label</h2>

<div class="label-input">
  <input
    type="text"
    placeholder="Enter label (32 characters max)"
    value={label}
    oninput={(e) => onChangeLabel((e.target as HTMLInputElement).value)}
    aria-label="POI label"
    maxlength="32"
    autocomplete="off"
  />
</div>

<style lang="scss">
  @use '~styles/variables';

  $color-light-green: #c0d29b;
  $color-dark-green: #4b5141;

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
    width: 100%;
    gap: 8px;
    padding: 16px 8px;

    > button {
      width: 50px;
      height: 50px;
      padding: 4px;
      border: none;
      border-radius: 12px;
      background: transparent;
      background-color: $color-dark-green;
      cursor: pointer;

      &[aria-current='true'] {
        border: solid 2px $color-light-green;
      }

      > div :global(svg) {
        width: 36px;
        height: 36px;
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

  .label-input {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 8px;

    input {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid $color-light-green;
      border-radius: 4px;
      font-size: 1em;
      background: #f8faef;
      color: #222;
      outline: none;
      transition: border 0.2s;
      box-sizing: border-box;

      &:focus {
        border-color: #8fae5d;
      }
    }
  }
</style>

<script lang="ts">
  const { data } = $props();
</script>

<main class="app">
  <h1>ICARUS Interactive Map</h1>

  <section class="section maps">
    <h2>Maps</h2>

    <div class="map-list">
      {#each data.maps as map}
        <a class="card" href={`/${map.path}`} aria-label={`Map of ${map.name}`}>
          <img
            class="thumbnail"
            src={`/thumbnail/${map.path}.jpg`}
            alt={`Thumbnail of ${map.name}`}
          />
          <div class="name">{map.name}</div>
        </a>
      {/each}
    </div>
  </section>
</main>

<style lang="scss">
  main.app {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .section {
    width: 100%;
    margin: 16px 0;
    text-align: center;
  }

  .map-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, 264px);
    gap: 32px;
    justify-content: center;
    width: 100%;
    padding: 16px;

    .card {
      display: flex;
      flex-direction: column;
      padding: 4px 4px 0;
      color: white;
      text-align: center;
      text-decoration: none;
      background-color: #333;

      .thumbnail {
        width: 256px;
        height: 256px;
      }

      .name {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 32px;
        color: white;
        background-color: #333;
      }

      &:hover {
        box-shadow:
          0 10px 15px -3px rgb(0 0 0 / 0.1),
          0 4px 6px -2px rgb(0 0 0 / 0.05);
        transform: translateY(-2px);

        .name {
          color: #e0bf26;
        }
      }
    }
  }
</style>

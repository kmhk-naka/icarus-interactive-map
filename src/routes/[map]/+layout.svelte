<script lang="ts">
  let { data, children } = $props();
</script>

<div id="app">
  <nav class="header-navigation">
    <ul class="navigation-list">
      <a class="navigation-item home" href="/">Home</a>
      {#each data.maps as map}
        <li class="navigation-item" data-selected={data.map.path === map.path}>
          <a href={`/${map.path}`}>{map.name}</a>
        </li>
      {/each}
    </ul>
  </nav>

  <main class="content">
    {@render children()}
  </main>
</div>

<style lang="scss">
  #app {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 600px;
    height: 100%;
  }

  .header-navigation {
    position: relative;
    z-index: 10;
    flex: 0 0 auto;
    width: 100%;
    height: 64px;
    color: white;
    background: #333;

    a {
      color: white;
      text-decoration: none;
    }

    .navigation-list {
      display: flex;
      justify-content: center;
      padding: 0;
      list-style-type: none;
    }

    .navigation-item {
      width: 104px;
      padding: 0 8px;
      margin: 0 8px;
      text-align: center;

      &.home {
        position: absolute;
        left: 16px;
      }

      &[data-selected='true'] {
        padding-bottom: 4px;
        box-shadow: inset 0 -2px 0 #e0bf26;
      }
    }
  }

  .content {
    position: relative;
    flex: 1 1 auto;
    width: 100%;
    height: 100%;
  }
</style>

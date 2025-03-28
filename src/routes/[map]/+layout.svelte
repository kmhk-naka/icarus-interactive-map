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
    left: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    min-width: 600px;
  }

  .header-navigation {
    position: relative;
    flex: 0 0 auto;
    width: 100%;
    height: 64px;
    background: #333;
    color: white;
    z-index: 10;

    a {
      color: white;
      text-decoration: none;
    }

    .navigation-list {
      display: flex;
      justify-content: center;
      list-style-type: none;
      padding: 0;
    }

    .navigation-item {
      width: 104px;
      text-align: center;
      margin: 0 8px;
      padding: 0 8px;

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

<script lang="ts">
  import { page } from '$app/state';
</script>

<div class="error-page">
  <h1 class="message">{page.error?.message ?? 'Oops!'}</h1>

  <a class="link" href="/"><h2>→ Home</h2></a>
</div>

<style lang="scss">
  .error-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;

    .message {
      font-size: 3rem;
    }

    .link {
      margin-top: 24px;
    }
  }
</style>

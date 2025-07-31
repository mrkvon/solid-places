<script lang="ts">
  import Header from '$lib/header.svelte'
  import '../app.css'

  let { children } = $props()
</script>

<div class="layout">
  <header class="header">
    <Header />
  </header>
  <main class="main">
    {@render children()}
  </main>
</div>

<style>
  :global(html, body) {
    margin: 0;
    padding: 0;
    height: 100%;
  }

  .layout {
    display: grid;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
  }

  .header {
    background-color: white;
  }

  .main {
    background-color: white;
    position: relative;
  }
</style>

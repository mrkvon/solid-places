<script lang="ts">
  let formData = { provider: '' }

  let { onsave }: { onsave: (data: typeof formData) => void } = $props()

  function handleSubmit(event: SubmitEvent): void {
    event.preventDefault()
    onsave(formData)
  }
</script>

<header>Select Provider</header>

<form onsubmit={handleSubmit}>
  <input type="url" bind:value={formData.provider} required placeholder="Identity Provider" />
  <button type="submit">Sign In</button>
</form>

<style>
  header {
    font-weight: bold;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
</style>

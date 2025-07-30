<script lang="ts">
  let formData = { provider: '' }

  let { onsave }: { onsave: (data: typeof formData) => void } = $props()

  function handleSubmit(event: SubmitEvent): void {
    event.preventDefault()
    onsave(formData)
  }
</script>

<form onsubmit={handleSubmit}>
  <input type="url" bind:value={formData.provider} required placeholder="Identity Provider" />
</form>

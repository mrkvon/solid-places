<script lang="ts">
  import { useResource, useSubject } from '$lib/ldoSvelte'
  import { FoafProfileShapeType } from '../../.ldo/foafProfile.shapeTypes'

  let { webId }: { webId: string } = $props()

  useResource(webId)

  let person = useSubject(FoafProfileShapeType, webId)
</script>

{$person.name}

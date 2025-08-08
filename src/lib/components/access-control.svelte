<script lang="ts">
  import { addToast, ToastType } from '$lib/components/toast.svelte'
  import { useLdo, useResource } from '$lib/ldoSvelte'
  import { session } from '$lib/stores/session'
  import {
    GetWacRuleSuccess,
    getWacUri,
    SolidContainer,
    SolidLeaf,
    type WacRule,
  } from '@ldo/connected-solid'
  import { FoafProfileShapeType } from '../../.ldo/foafProfile.shapeTypes'
  import AccessControlVisual from './access-control-visual.svelte'

  const { uri }: { uri: string } = $props()

  const resource = useResource(uri)

  let wac = $state<GetWacRuleSuccess<SolidLeaf | SolidContainer>>()

  $effect(() => {
    ;($resource as SolidLeaf).getWac().then((wacResult) => {
      if (wacResult.isError) throw wacResult
      wac = wacResult
    })
  })

  const { getResource, getSubject } = useLdo()

  const handleChangeWac = async (updatedWac?: WacRule) => {
    if ($resource?.type !== 'SolidLeaf') throw new Error('not a leaf')

    if (!wac) throw new Error()
    let previousWac: WacRule = JSON.parse(JSON.stringify(wac.wacRule))

    if (updatedWac === undefined) {
      const wacUriResult = await getWacUri($resource, { fetch: $session.fetch })
      if (wacUriResult.isError) throw wacUriResult
      const wacUri = wacUriResult.wacUri
      const resource = getResource(wacUri)
      await resource.delete()
    } else {
      await $resource.setWac(updatedWac)
    }
    const wacResult = await $resource.getWac({ ignoreCache: true })
    if (wacResult.isError) throw wacResult
    wac = wacResult
    const savedRule = wacResult.wacRule

    const visibility = (() => {
      if (savedRule.public.read) return 'public'
      if (
        Object.entries(savedRule.agent).some(
          ([webid, access]) => webid !== $session.info.webId && access.read,
        )
      )
        return 'shared'
      return 'private'
    })()

    addToast({
      data: {
        title: 'Update successful',
        description: `Access was updated to ${visibility}`,
        type: ToastType.success,
      },
    })

    if (previousWac.public.read !== savedRule.public.read)
      addToast({
        data: {
          title: 'TODO Notification successful',
          description: `Public geoindex was notified`,
          type: ToastType.success,
        },
      })

    // TODO figure out when to notify based on previous and current visibility
    // now find out which agents to notify
    const currentAgents = Object.keys(savedRule.agent)
    const previousAgents = Object.keys(previousWac.agent)
    // notify about addition
    for (let agent of currentAgents) {
      if (!previousAgents.includes(agent))
        addToast({
          data: {
            title: 'TODO Notification successful',
            description: `${getSubject(FoafProfileShapeType, agent)?.name} was notified`,
            type: ToastType.success,
          },
        })
    }
    // TODO notify about deletion
  }
</script>

<AccessControlVisual wac={wac?.wacRule} self={$session.info.webId!} onchangewac={handleChangeWac} />

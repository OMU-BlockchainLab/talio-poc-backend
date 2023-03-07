import { ACTIONS, RESOURCES } from 'Services/ACL'
import Context from 'Services/Context'

export default async function me(ctx: Context) {
  await ctx.canAccess({
    resource: RESOURCES.ME,
    action: ACTIONS.VIEW,
  })

  return ctx.user
}

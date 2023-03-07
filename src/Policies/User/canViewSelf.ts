import Context from 'Services/Context'

import AdminPolicy from '../Admin'

export default async function canViewSelf(ctx: Context, userId: string) {
  return ctx.user?.id === userId
}

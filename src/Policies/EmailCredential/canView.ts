import Context from 'Services/Context'

import AdminPolicy from '../Admin'

export default async function canView(ctx: Context, userId: string) {
  const isAdminOrSuperAdmin = await AdminPolicy.isAdminOrSuperAdmin(ctx, false)

  return isAdminOrSuperAdmin || ctx.user?.id === userId
}

import certEntity from 'Entities/Certificates'

import { CertsArgs } from 'Schema/Admin/Args/Cert'

import Context from 'Services/Context'

export default async function certs(ctx: Context, args: CertsArgs) {
  //   await ctx.canAccess({
  //     resource: RESOURCES.certS,
  //     action: ACTIONS.VIEW,
  //   })

  //   await AdminPolicy.isAdminOrSuperAdmin(ctx)

  return certEntity.get(args)
}

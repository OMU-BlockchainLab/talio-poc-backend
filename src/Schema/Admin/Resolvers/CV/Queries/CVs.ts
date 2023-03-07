import CVEntity from 'Entities/CV'

import { CVsArgs } from 'Schema/Admin/Args/CV'

import Context from 'Services/Context'

export default async function CVs(ctx: Context, args: CVsArgs) {
  //   await ctx.canAccess({
  //     resource: RESOURCES.CVS,
  //     action: ACTIONS.VIEW,
  //   })

  //   await AdminPolicy.isAdminOrSuperAdmin(ctx)

  return CVEntity.getCVList(args)
}

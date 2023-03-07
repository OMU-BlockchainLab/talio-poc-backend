import CVEntity from 'Entities/CV'

import { AdminPolicy } from 'Policies'

import { UpdateCVArgs } from 'Schema/Admin/Args/CV'

import OkType from 'Schema/Types/Ok'

import { ACTIONS, RESOURCES } from 'Services/ACL'
import Context from 'Services/Context'

export default async function updateCV(ctx: Context, args: UpdateCVArgs) {
  //   await ctx.canAccess({
  //     resource: RESOURCES.CVs,
  //     action: ACTIONS.UPDATE,
  //   })

  //   await AdminPolicy.canUpdateCV(args, ctx)
  await CVEntity.update(args)

  return OkType.success
}

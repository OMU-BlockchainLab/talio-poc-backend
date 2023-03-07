/* eslint-disable no-return-await */
import certEntity from 'Entities/Certificates'

import { CreateCertArgs } from 'Schema/Admin/Args/Cert'

import Context from 'Services/Context'

export default async function createCV(ctx: Context, args: CreateCertArgs) {
  //   await ctx.canAccess({
  //     resource: RESOURCES.ME,
  //     action: ACTIONS.CREATE,
  //   })

  return await certEntity.create({ ...args })
}

import certEntity from 'Entities/Certificates'
import UserEntity from 'Entities/User'

import { AdminPolicy } from 'Policies'

import { UpdateCertArgs } from 'Schema/Admin/Args/Cert'

import OkType from 'Schema/Types/Ok'

import { ACTIONS, RESOURCES } from 'Services/ACL'
import Context from 'Services/Context'

export default async function update(ctx: Context, args: UpdateCertArgs) {
  await certEntity.update(args)

  return OkType.success
}

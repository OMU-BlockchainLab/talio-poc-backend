import roleEntity from 'Entities/Role'
import rolePermissionEntity from 'Entities/RolePermission'

import { RoleStatus } from 'Models/Permission'

import { AdminPolicy } from 'Policies'

import { CreateRoleArgs } from 'Schema/Admin/Args/Role'

import { ACTIONS, RESOURCES } from 'Services/ACL'
import Context from 'Services/Context'

export default async function create(ctx: Context, args: CreateRoleArgs) {
  // await ctx.canAccess({
  //   resource: RESOURCES.ROLE,
  //   action: ACTIONS.CREATE,
  // })

  //await AdminPolicy.isAdminOrSuperAdmin(ctx)

  const role = await roleEntity.create({
    ...args,
    code: args.name,
    createdById: ctx.user?.getDataValue('id'),
    status: RoleStatus.active,
  })
  return role
}

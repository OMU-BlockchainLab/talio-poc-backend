import permissionEntity from 'Entities/Permission'
import roleEntity from 'Entities/Role'

import { AdminPolicy } from 'Policies'

import { RoleArgs } from 'Schema/Admin/Args/Role'

import { ModuleType } from 'Schema/Types/Role'

import { ACTIONS, RESOURCES } from 'Services/ACL'
import Context from 'Services/Context'

import handleIncludePermission from './handleIncludePermission'

export default async function roles(ctx: Context, args: RoleArgs) {
  await ctx.canAccess({
    resource: RESOURCES.ROLE,
    action: ACTIONS.VIEW,
  })

  await AdminPolicy.isAdminOrSuperAdmin(ctx)

  const role = await roleEntity.findById(args.id)
  const modules: ModuleType[] = await permissionEntity.getIndex({})
  if (modules.length && role) {
    const moduleListResult: ModuleType[] = await handleIncludePermission(
      modules,
      role?.permissions,
      role,
    )
    role.setDataValue('modules', moduleListResult)
    role.setDataValue('permissions', [])
  }

  return role?.toJSON()
}

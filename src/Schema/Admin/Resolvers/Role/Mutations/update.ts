import { Op } from 'sequelize'

import roleEntity from 'Entities/Role'
import rolePermissionEntity from 'Entities/RolePermission'

import { UserRole } from 'Models/User'

import { AdminPolicy } from 'Policies'

import { UpdateRoleArgs } from 'Schema/Admin/Args/Role'

import { ACTIONS, RESOURCES } from 'Services/ACL'
import Context from 'Services/Context'

export default async function update(ctx: Context, args: UpdateRoleArgs) {
  await ctx.canAccess({
    resource: RESOURCES.ROLE,
    action: ACTIONS.UPDATE,
  })

  await AdminPolicy.isAdminOrSuperAdmin(ctx)

  await Promise.all(
    args.permissions.map(async permission => {
      await rolePermissionEntity.createRolePermissionIfNotExist({
        roleId: args?.id,
        permissionId: permission.id,
      })
    }),
  )

  await rolePermissionEntity.destroyMultiRolePermisson({
    roleId: args?.id,
    permissionId: {
      [Op.notIn]: args.permissions.map(x => x.id),
    },
  })
  const role = await roleEntity.updateOne(
    { updatedById: ctx.user?.getDataValue('id') },
    args.id,
  )

  return { ok: true }
}

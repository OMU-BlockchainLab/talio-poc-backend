import { PERMISSION_ERRORS } from 'Constants/errors'

import permissionEntity from 'Entities/Permission'
import roleEntity from 'Entities/Role'

import { RolePermission } from 'Models'

import { CommonError } from 'Services/Errors'

interface rolePermission {
  roleId: string
  permissionId: string
}

async function isNotExist(roleId: string, permissionId: string) {
  return (
    !(await roleEntity.findById(roleId)) ||
    !(await permissionEntity.findById(permissionId))
  )
}

export default async function createRolePermissionIfNotExist(
  item: rolePermission,
) {
  if (await isNotExist(item.roleId, item.permissionId))
    throw new CommonError(PERMISSION_ERRORS.NOT_FOUND)
  else
    return RolePermission.findOrCreate({
      where: {
        roleId: item.roleId,
        permissionId: item.permissionId,
      },
      defaults: item,
    })
}

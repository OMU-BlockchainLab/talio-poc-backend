import RoleEntity from 'Entities/Role'

import { UserRole } from 'Models/User'

export async function getRoleIdByRoleName(roleCode: string) {
  return (
    await RoleEntity.findOne({
      code: roleCode,
    })
  )?.getDataValue('id')
}

export async function getRoleNameByRoleId(roleId?: string) {
  return (await RoleEntity.findById(roleId))?.getDataValue('code')
}

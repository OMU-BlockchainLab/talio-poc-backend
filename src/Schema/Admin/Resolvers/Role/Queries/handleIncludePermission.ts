/* eslint-disable no-restricted-syntax */
import _ from 'lodash'

import { Permission, Role } from 'Models'
import { UserRole } from 'Models/User'

import PermissionType from 'Schema/Types/Permission'
import { ModuleType } from 'Schema/Types/Role'

export default async function handleIncludePermission(
  modules: ModuleType[],
  rolePermission?: PermissionType[],
  role?: Role,
) {
  for (const module of modules) {
    for (const permission of module.permissions) {
      const isIncluded = _.find(rolePermission, f => f.code === permission.code)
      if (isIncluded || role?.code === UserRole.superAdmin) {
        permission.isIncluded = true
      }
    }
  }

  return modules
}

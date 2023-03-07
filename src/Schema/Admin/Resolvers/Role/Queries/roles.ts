/* eslint-disable no-await-in-loop */
/* eslint-disable prefer-const */
/* eslint-disable no-restricted-syntax */
import permissionEntity from 'Entities/Permission'
import roleEntity from 'Entities/Role'

import { AdminPolicy } from 'Policies'

import RoleType, { ModuleType } from 'Schema/Types/Role'

import { ACTIONS, RESOURCES } from 'Services/ACL'
import Context from 'Services/Context'

import handleIncludePermission from './handleIncludePermission'

function parseTo(rows: any[]) {
  const listResult: RoleType[] = []
  for (const role of rows) {
    const ele: RoleType = new RoleType(role)
    listResult.push(ele)
  }
  return listResult
}

export default async function roles(ctx: Context) {
  //   await ctx.canAccess({
  //     resource: RESOURCES.ROLE,
  //     action: ACTIONS.VIEW,
  //   })

  //   await AdminPolicy.isAdminOrSuperAdmin(ctx)

  let { rows, count } = await roleEntity.findAll({})
  const modules: ModuleType[] = await permissionEntity.getIndex({})
  if (rows.length && modules.length) {
    for (const role of rows) {
      const moduleListResult: ModuleType[] = await handleIncludePermission(
        modules,
        role.permissions,
        role,
      )
      role.setDataValue('modules', moduleListResult)
      role.setDataValue('permissions', [])
    }
  }

  return { rows: rows.map(m => m.toJSON()), count }
}

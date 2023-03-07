/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import PermissionType from 'Schema/Types/Permission'
import { ModuleType } from 'Schema/Types/Role'

import { RESOURCES } from 'Services/ACL'

import findAll from './findAll'

export default async function (request: any): Promise<ModuleType[]> {
  const permissions = await findAll({
    ...request,
  })
  const MODULES = Object.values(RESOURCES).map(x => x.toUpperCase())
  const data = MODULES.map(modulName => {
    const modulePermission = permissions.rows.filter(
      per => per.modulePrefix === modulName,
    )

    return {
      name: modulName,
      permissions: modulePermission.map(m => PermissionType.clone(m)),
    }
  })

  return data || []
}

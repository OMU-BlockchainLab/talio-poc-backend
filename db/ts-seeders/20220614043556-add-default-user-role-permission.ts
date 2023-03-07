/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
import '@startupcraft/dotenv-config'
import 'Services/Db'

import { Op } from 'sequelize'

import permissionEntity from 'Entities/Permission'
import roleEntity from 'Entities/Role'
import rolePermissionEntity from 'Entities/RolePermission'

import { RoleStatus } from 'Models/Permission'
import { UserRole } from 'Models/User'

import { ACTIONS, RESOURCES } from 'Services/ACL'

require('tsconfig-paths/register')

class ActionResource {
  public action: string

  public resource: string

  public constructor(action: string, resource: string) {
    this.action = action
    this.resource = resource
    return this
  }
}

const userPermission: ActionResource[] = [
  new ActionResource(ACTIONS.VIEW, RESOURCES.ME),
  new ActionResource(ACTIONS.UPDATE, RESOURCES.ME),
  new ActionResource(ACTIONS.UPDATE, RESOURCES.OWN_PROFILE),
  new ActionResource(ACTIONS.VIEW, RESOURCES.OWN_PROFILE),
  // INVITE
  new ActionResource(ACTIONS.CREATE, RESOURCES.INVITE),
  new ActionResource(ACTIONS.VIEW, RESOURCES.INVITE),
  new ActionResource(ACTIONS.UPDATE, RESOURCES.INVITE),
  new ActionResource(ACTIONS.DELETE, RESOURCES.INVITE),
  // CONTACTS
  new ActionResource(ACTIONS.CREATE, RESOURCES.CONTACTS),
  new ActionResource(ACTIONS.VIEW, RESOURCES.CONTACTS),
  new ActionResource(ACTIONS.UPDATE, RESOURCES.CONTACTS),
  new ActionResource(ACTIONS.DELETE, RESOURCES.CONTACTS),
  // WALLETS
  new ActionResource(ACTIONS.CREATE, RESOURCES.WALLETS),
  new ActionResource(ACTIONS.VIEW, RESOURCES.WALLETS),
  new ActionResource(ACTIONS.UPDATE, RESOURCES.WALLETS),
  new ActionResource(ACTIONS.DELETE, RESOURCES.WALLETS),
  // REQUESTS
  new ActionResource(ACTIONS.CREATE, RESOURCES.REQUESTS),
  new ActionResource(ACTIONS.VIEW, RESOURCES.REQUESTS),
  new ActionResource(ACTIONS.UPDATE, RESOURCES.REQUESTS),
  new ActionResource(ACTIONS.DELETE, RESOURCES.REQUESTS),

  new ActionResource(ACTIONS.VIEW, RESOURCES.USERS),
]

async function run() {
  try {
    const codeList = userPermission.map(
      x => `${x.resource.toUpperCase()}_${x.action.toUpperCase()}`,
    )
    const listPermisisonId = (
      await permissionEntity.findAll({
        code: {
          [Op.in]: codeList,
        },
      })
    ).rows.map(perm => perm.getDataValue('id'))

    const userRole = await roleEntity.findOne({ code: UserRole.user })
    const userRoleId = userRole
      ? userRole.getDataValue('id')
      : (
          await roleEntity.create({
            name: UserRole.user,
            code: UserRole.user,
            status: RoleStatus.active,
          })
        ).getDataValue('id')
    await rolePermissionEntity.bulkCreateRolePermission(
      listPermisisonId.map(permission => ({
        roleId: userRoleId,
        permissionId: permission,
      })),
    )
  } catch (e: any) {
    console.log(`Error ${e.message}`)
  }

  console.log('Success')
}

export default run

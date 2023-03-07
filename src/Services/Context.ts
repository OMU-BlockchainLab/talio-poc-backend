import { Context as KoaContext } from 'koa'

import { GENERIC_ERRORS } from 'Constants/errors'

import createDataLoaders, { DataLoaders } from 'DataLoaders'

import WSContext from 'Interfaces/WSContext'

import { Permission, Role, RolePermission, User } from 'Models'
import { UserRole } from 'Models/User'

import { ResourceAction } from 'Services/ACL'
import { CommonError, UnauthorizedError } from 'Services/Errors'

async function checkAccessPermission(role: Role, permissionCode: string) {
  if (!role) return false
  if (role.getDataValue('code') === UserRole.superAdmin) {
    return true
  }
  const condition = {
    roleId: role.getDataValue('id'),
  }
  const rolePer = await RolePermission.findOne({
    where: condition,
    include: [
      {
        model: Permission,
        as: 'permissionObj',
        where: {
          code: permissionCode,
        },
      },
    ],
  })

  return !!rolePer
}

function getPermissionCode(resource: string, action: string): string {
  if (!resource || !action) {
    return ''
  }
  return `${resource.toUpperCase()}_${action.toUpperCase()}`
}

export default class Context {
  public requestContext?: KoaContext | null

  public wsContext?: WSContext | null

  public user?: User | null

  public dataLoaders: DataLoaders

  public constructor({
    requestContext,
    wsContext,
  }: {
    requestContext?: KoaContext | null
    wsContext?: WSContext | null
  }) {
    this.requestContext = requestContext
    this.wsContext = wsContext

    this.user = this.requestContext?.user || this.wsContext?.user

    this.dataLoaders = this.requestContext?.dataLoaders || createDataLoaders()
  }

  public async canAccess(resourceAction?: ResourceAction): Promise<User> {
    if (!this.user) throw new UnauthorizedError()

    // if (resourceAction) {
    //   const isAllowed: boolean = await checkAccessPermission(
    //     this.user.roleObj,
    //     getPermissionCode(resourceAction.resource, resourceAction.action),
    //   )
    //   if (!isAllowed) {
    //     throw new CommonError(GENERIC_ERRORS.ACCESS_DENIED)
    //   }
    // }

    return this.user
  }
}

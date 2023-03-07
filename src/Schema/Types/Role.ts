import { Field, ID, InputType, ObjectType } from 'type-graphql'

import { Role } from 'Models'

import PermissionType from './Permission'

@ObjectType()
export class ModuleType {
  @Field()
  public name: string

  @Field(() => [PermissionType])
  public permissions: PermissionType[]

  public constructor(name: string, permissions: PermissionType[]) {
    this.name = name
    this.permissions = permissions
  }
}
@ObjectType('Role')
export default class RoleType extends Role {
  @Field(() => [ModuleType], { nullable: true })
  public modules?: ModuleType[]

  public constructor(parent: Role) {
    super()
    this.id = parent.id
    this.name = parent.name
    this.code = parent.code
    this.status = parent.status
    this.createdAt = parent.createdAt
    this.createdById = parent.createdById
    this.updatedAt = parent.updatedAt
    this.updatedById = parent.updatedById
  }
}

@ObjectType('RoleId')
export class RoleIdType {
  @Field(() => ID)
  public roleId: string
}

@ObjectType('RolePermission')
export class RolePermission {
  @Field(() => ID)
  public roleId: string

  @Field(() => ID)
  public permissionId: string
}

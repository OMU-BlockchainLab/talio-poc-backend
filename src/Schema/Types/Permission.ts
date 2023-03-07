import { Field, ObjectType } from 'type-graphql'

import { Permission } from 'Models'

@ObjectType('Permission')
export default class PermissionType extends Permission {
  @Field(() => Boolean, { nullable: true, name: 'isIncluded' })
  public isIncluded?: boolean = false

  public constructor(perm: Permission) {
    super()
    this.id = perm.id
    this.name = perm.name
    this.code = perm.code
    this.modulePrefix = perm.modulePrefix
    this.status = perm.status
    this.createdAt = perm.createdAt
    this.updatedAt = perm.updatedAt
    this.deletedAt = perm.deletedAt

    return this
  }

  public static clone(perm: Permission): PermissionType {
    const instance = new PermissionType(perm)
    instance.setDataValue('id', perm.id)
    return instance
  }
}

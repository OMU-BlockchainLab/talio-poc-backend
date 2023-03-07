import { ArgsType, Field, ID, InputType } from 'type-graphql'

@ArgsType()
export class RoleArgs {
  @Field(() => ID)
  public id: string
}

@InputType('PermissionType')
class PermissionType {
  @Field(() => ID, { nullable: true })
  public id: string
}

@ArgsType()
export class PermissionTypeArgs {
  @Field(() => ID)
  public id: string
}

@ArgsType()
export class CreateRoleArgs {
  @Field()
  public name: string
}

@ArgsType()
export class UpdateRoleArgs {
  @Field()
  public id: string

  @Field(() => [PermissionType])
  public permissions: PermissionType[]
}

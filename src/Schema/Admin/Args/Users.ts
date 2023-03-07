import { ArgsType, Field, ID, InputType, Int } from 'type-graphql'

import { UserState, UserTypeRole } from 'Models/User'

import { PaginationArgs, SortInput } from 'Schema/Shared/Args/Common'

@ArgsType()
export class UsersArgs extends PaginationArgs {
  @Field({ nullable: true })
  public search?: string

  @Field(() => [UserTypeRole], { nullable: true })
  public userTypeRoles?: UserTypeRole[]

  @Field(() => [SortInput], { nullable: true })
  public sort?: SortInput[]

  @Field({ nullable: true })
  public outputRoleCode?: string
}

@ArgsType()
export class DeleteUserArgs {
  @Field(() => ID)
  public id: string
}

@ArgsType()
export class UserArgs {
  @Field(() => ID)
  public id: string
}

@ArgsType()
export class DeleteManyUsersArgs {
  @Field(() => [ID])
  public ids: string[]
}

@ArgsType()
export class UpdateUserArgs {
  @Field(() => [ID])
  public ids: string[]

  @Field(() => UserState, { nullable: true })
  public state?: UserState

  @Field(() => Boolean, { nullable: true })
  public isVerified?: boolean

  @Field(() => Int, { nullable: true })
  public weight?: number
}

@ArgsType()
export class InviteUserByEmailArgs {
  @Field()
  public email: string

  @Field()
  public roleId?: string

  @Field({ nullable: true })
  public nickname?: string
}

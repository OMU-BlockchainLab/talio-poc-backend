import { Args, Ctx, Mutation, Query, Resolver } from 'type-graphql'

import {
  DeleteManyUsersArgs,
  DeleteUserArgs,
  InviteUserByEmailArgs,
  UpdateUserArgs,
  UserArgs,
  UsersArgs,
} from 'Schema/Admin/Args/Users'

import DashboardType from 'Schema/Types/Dashboard'
import OkType from 'Schema/Types/Ok'
import UserType from 'Schema/Types/User'
import UserList from 'Schema/Types/UserList'

import Context from 'Services/Context'

import mutations from './Mutations'
import queries from './Queries'

@Resolver(() => UserType)
export default class UsersResolver {
  @Query(() => UserType)
  public me(@Ctx() ctx: Context) {
    return queries.me(ctx)
  }

  @Query(() => UserList)
  public async users(@Ctx() ctx: Context, @Args() args: UsersArgs) {
    return queries.users(ctx, args)
  }

  @Query(() => UserType)
  public async user(@Ctx() ctx: Context, @Args() args: UserArgs) {
    return queries.user(ctx, args)
  }

  @Mutation(() => OkType)
  public async deleteUser(@Ctx() ctx: Context, @Args() args: DeleteUserArgs) {
    return mutations.deleteUser(ctx, args)
  }

  @Mutation(() => OkType)
  public async deleteManyUsers(
    @Ctx() ctx: Context,
    @Args() args: DeleteManyUsersArgs,
  ) {
    return mutations.deleteManyUsers(ctx, args)
  }

  @Mutation(() => OkType)
  public async inviteUserByEmail(
    @Ctx() ctx: Context,
    @Args() args: InviteUserByEmailArgs,
  ) {
    return mutations.inviteUserByEmail(ctx, args)
  }

  @Mutation(() => OkType)
  public async updateUser(@Ctx() ctx: Context, @Args() args: UpdateUserArgs) {
    return mutations.updateUser(ctx, args)
  }
}

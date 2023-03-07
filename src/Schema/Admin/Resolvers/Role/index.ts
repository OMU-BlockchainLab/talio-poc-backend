import { Args, Ctx, Mutation, Query, Resolver } from 'type-graphql'

import {
  CreateRoleArgs,
  RoleArgs,
  UpdateRoleArgs,
} from 'Schema/Admin/Args/Role'

import OkType from 'Schema/Types/Ok'
import RoleType from 'Schema/Types/Role'
import RoleList from 'Schema/Types/RoleList'

import Context from 'Services/Context'

import mutations from './Mutations'
import queries from './Queries'

// @Resolver(() => )
export default class RoleResolve {
  @Query(() => RoleList)
  public async roles(@Ctx() ctx: Context) {
    return queries.roles(ctx)
  }

  @Query(() => RoleType)
  public async role(@Ctx() ctx: Context, @Args() args: RoleArgs) {
    return queries.role(ctx, args)
  }

  @Mutation(() => RoleType)
  public async createRole(@Ctx() ctx: Context, @Args() args: CreateRoleArgs) {
    return mutations.create(ctx, args)
  }

  @Mutation(() => OkType)
  public async destroyRole(@Ctx() ctx: Context, @Args() args: RoleArgs) {
    return mutations.destroy(ctx, args)
  }

  @Mutation(() => OkType)
  public async updateRole(@Ctx() ctx: Context, @Args() args: UpdateRoleArgs) {
    return mutations.update(ctx, args)
  }
}

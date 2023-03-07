import { Args, Ctx, Mutation, Query, Resolver } from 'type-graphql'

import { PermissionTypeArgs } from 'Schema/Admin/Args/Role'

import PermissionType from 'Schema/Types/Permission'
import PermissionList from 'Schema/Types/PermissionList'

import Context from 'Services/Context'

import mutations from './Mutations'
import queries from './Queries'

@Resolver(() => PermissionType)
export default class PermissionResolve {
  @Query(() => PermissionList)
  public async permissions(@Ctx() ctx: Context) {
    return queries.permissions(ctx)
  }

  @Query(() => PermissionType)
  public async permission(
    @Ctx() ctx: Context,
    @Args() args: PermissionTypeArgs,
  ) {
    return queries.permission(ctx, args)
  }

  @Mutation(() => PermissionType)
  public async destroy(@Ctx() ctx: Context, @Args() args: PermissionTypeArgs) {
    return mutations.destroy(ctx, args)
  }
}

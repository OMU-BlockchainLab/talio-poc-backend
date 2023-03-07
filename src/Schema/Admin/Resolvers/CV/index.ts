import { Args, Ctx, Mutation, Query, Resolver } from 'type-graphql'

import {
  CreateCVArgs,
  CVsArgs,
  DeleteCVArgs,
  DeleteManyCVsArgs,
  UpdateCVArgs,
} from 'Schema/Admin/Args/CV'

import CVType from 'Schema/Types/CV'
import CVList from 'Schema/Types/CVList'
import OkType from 'Schema/Types/Ok'

import Context from 'Services/Context'

import mutations from './Mutations'
import queries from './Queries'

@Resolver(() => CVType)
export default class CVsResolver {
  @Query(() => CVList)
  public async CVs(@Ctx() ctx: Context, @Args() args: CVsArgs) {
    return queries.CVs(ctx, args)
  }

  @Mutation(() => OkType)
  public async createCV(@Ctx() ctx: Context, @Args() args: CreateCVArgs) {
    return mutations.createCV(ctx, args)
  }

  @Mutation(() => OkType)
  public async updateCV(@Ctx() ctx: Context, @Args() args: UpdateCVArgs) {
    return mutations.updateCV(ctx, args)
  }
}

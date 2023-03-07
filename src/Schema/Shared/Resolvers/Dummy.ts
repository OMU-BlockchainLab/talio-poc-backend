import { Mutation, Query, Resolver } from 'type-graphql'

import OkType from 'Schema/Types/Ok'

@Resolver()
export default class DummyResolver {
  @Query(() => OkType)
  public dummyQuery() {
    return OkType.success
  }

  @Mutation(() => OkType)
  public dummyMutation() {
    return OkType.success
  }
}

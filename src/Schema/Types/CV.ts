import { Ctx, Field, ObjectType, Root } from 'type-graphql'

import { User } from 'Models'
import CV from 'Models/CV'

import Context from 'Services/Context'

@ObjectType('CV')
export default class CVType extends CV {
  //   @Field(() => [User])
  //   public async owner(@Root() root: CV, @Ctx() ctx: Context) {
  //     return (await ctx.dataLoaders.users.byId.load(root.createdBy)) || []
  //   }
}

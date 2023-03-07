import { ObjectType } from 'type-graphql'

import Cert from 'Models/Certificate'

@ObjectType('Cert')
export default class CertType extends Cert {
  //   @Field(() => [User])
  //   public async owner(@Root() root: Cert, @Ctx() ctx: Context) {
  //     return (await ctx.dataLoaders.users.byId.load(root.createdBy)) || []
  //   }
}

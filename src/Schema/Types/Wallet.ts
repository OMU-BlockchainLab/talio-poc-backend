import { Ctx, Field, ObjectType, Root } from 'type-graphql'

import { Wallet } from 'Models'

import Context from 'Services/Context'

import UserType from './User'

@ObjectType('Wallet')
export default class WalletType extends Wallet {
  @Field(() => UserType, { nullable: true, name: 'user' })
  public async userResolver(@Root() root: Wallet, @Ctx() ctx: Context) {
    return root.user || ctx.dataLoaders.users.byId.load(root.userId)
  }
}

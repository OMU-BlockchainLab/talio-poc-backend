import { Ctx, Field, ObjectType, Root } from 'type-graphql'

import { Contact } from 'Models'

import Context from 'Services/Context'

import UserType from './User'

@ObjectType('Contact')
export default class ContactType extends Contact {
  @Field(() => UserType, { nullable: true, name: 'user' })
  public async userResolver(@Root() root: Contact, @Ctx() ctx: Context) {
    return root.user || ctx.dataLoaders.users.byId.load(root.userId)
  }
}

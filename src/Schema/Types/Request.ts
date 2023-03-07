import { Ctx, Field, ObjectType, Root } from 'type-graphql'

import { Request } from 'Models'

import Context from 'Services/Context'

import UserType from './User'

@ObjectType('Request')
export default class RequestType extends Request {
  @Field(() => UserType, { nullable: true, name: 'fromUser' })
  public async fromUserResolver(@Root() root: Request, @Ctx() ctx: Context) {
    return root.fromUser || ctx.dataLoaders.users.byId.load(root.fromUserId)
  }

  @Field(() => UserType, { nullable: true, name: 'toUser' })
  public async toUserResolver(@Root() root: Request, @Ctx() ctx: Context) {
    return root.toUser || ctx.dataLoaders.users.byId.load(root.toUserId)
  }
}

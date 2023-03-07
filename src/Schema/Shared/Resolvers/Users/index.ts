import {
  Args,
  Ctx,
  Mutation,
  Query,
  Resolver,
  Root,
  Subscription,
} from 'type-graphql'

import { PubSubTopics } from 'Constants/pubSub'

import NotificationPayload from 'Interfaces/NotificationPayload'

import { CreateReportArgs, UpdateProfileArgs } from 'Schema/Shared/Args/Users'

import NotificationType from 'Schema/Types/Notification'
import OkType from 'Schema/Types/Ok'
import UserType from 'Schema/Types/User'
import UserProfileType, { UserIdType } from 'Schema/Types/UserProfile'
import { subscriptionNotUserFilter, subscriptionUserFilter } from 'Schema/Utils'

import Context from 'Services/Context'

import mutations from './Mutations'
import queries from './Queries'

@Resolver(() => UserType)
export default class UsersResolver {
  @Query(() => UserType)
  public me(@Ctx() ctx: Context) {
    return queries.me(ctx)
  }

  @Mutation(() => OkType)
  public createReport(@Args() args: CreateReportArgs) {
    return mutations.createReport()
  }

  @Mutation(() => UserProfileType)
  public updateProfile(@Args() args: UpdateProfileArgs, @Ctx() ctx: Context) {
    return mutations.updateProfile(ctx, args)
  }

  @Subscription(() => NotificationType, {
    topics: [PubSubTopics.Notification],
    filter: subscriptionUserFilter,
  })
  public notifications(@Root() payload: NotificationPayload): NotificationType {
    return payload
  }

  @Subscription(() => UserIdType, {
    topics: [PubSubTopics.ProfileUpdated],
    filter: subscriptionNotUserFilter,
  })
  public profileUpdated(@Root() payload: { userId: string }): UserIdType {
    return payload
  }
}

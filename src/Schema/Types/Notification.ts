import GraphQLJSON from 'graphql-type-json'
import { Field, ObjectType } from 'type-graphql'

import { NotificationKind } from 'Constants/enums'

@ObjectType('Notification')
export default class NotificationType {
  @Field(() => NotificationKind)
  public kind: NotificationKind

  @Field(() => String, { nullable: true })
  public text?: string

  @Field(() => GraphQLJSON, { nullable: true })
  public payload?: Record<string, unknown>
}

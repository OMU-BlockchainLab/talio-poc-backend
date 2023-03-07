import { Field, GraphQLISODateTime, ObjectType } from 'type-graphql'

@ObjectType('SignedUrl')
export default class SignedUrlType {
  @Field(() => String)
  public url: string

  @Field(() => GraphQLISODateTime)
  public expiresAt: Date
}

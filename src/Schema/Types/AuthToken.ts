import { Field, ObjectType } from 'type-graphql'

@ObjectType('AuthToken')
export default class AuthTokenType {
  @Field()
  public accessToken: string

  @Field({ nullable: true })
  public refreshToken?: string
}

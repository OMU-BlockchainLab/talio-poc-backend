import { ArgsType, Field } from 'type-graphql'

@ArgsType()
export class RefreshTokenArgs {
  @Field()
  public token: string
}

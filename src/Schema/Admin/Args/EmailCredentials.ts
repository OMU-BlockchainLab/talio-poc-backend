import { ArgsType, Field } from 'type-graphql'

@ArgsType()
export class SignInByEmailArgs {
  @Field()
  public email: string

  @Field()
  public password: string

  @Field({ nullable: true })
  public withRefresh?: boolean
}

@ArgsType()
export class SignUpByEmailArgs {
  @Field()
  public email: string

  @Field()
  public password: string

  @Field()
  public fullName: string

  @Field()
  public roleId: string
}

@ArgsType()
export class ConfirmEmailArgs {
  @Field()
  public token: string

  @Field()
  public password: string

  @Field({ nullable: true })
  public withRefresh?: boolean
}

@ArgsType()
export class ChangeEmailPasswordArgs {
  @Field()
  public token: string

  @Field()
  public password: string
}

@ArgsType()
export class RequestChangeEmailPasswordArgs {
  @Field()
  public email: string
}

@ArgsType()
export class CheckEmailPasswordTokenArgs {
  @Field()
  public token: string
}

@ArgsType()
export class CheckEmailConfirmationTokenArgs {
  @Field()
  public token: string
}

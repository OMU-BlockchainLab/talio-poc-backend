import { Length, MaxLength } from 'class-validator'
import { ArgsType, Field } from 'type-graphql'

import { USER_PROFILE_ERRORS } from 'Constants/errors'

@ArgsType()
export class UpdateProfileArgs {
  @Field({ nullable: true })
  @Length(3, 64, { message: USER_PROFILE_ERRORS.NICKNAME_WRONG_LENGTH })
  public nickname?: string

  @Field({ nullable: true })
  @MaxLength(256, { message: USER_PROFILE_ERRORS.STATUS_MESSAGE_TOO_LONG })
  public statusMessage?: string

  @Field({ nullable: true })
  public photoUrl?: string

  @Field({ nullable: true })
  public backgroundUrl?: string

  @Field({ nullable: true })
  public email?: string
}

@ArgsType()
export class CreateReportArgs {
  @Field()
  public reason: string

  @Field({ nullable: true })
  public message?: string
}

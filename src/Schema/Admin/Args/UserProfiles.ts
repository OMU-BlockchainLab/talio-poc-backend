import { Length, MaxLength } from 'class-validator'
import { ArgsType, Field, ID } from 'type-graphql'

import { USER_PROFILE_ERRORS } from 'Constants/errors'

@ArgsType()
export class UserProfileArgs {
  @Field(() => ID)
  public userId: string

  @Field({ nullable: true })
  @Length(3, 64, { message: USER_PROFILE_ERRORS.NICKNAME_WRONG_LENGTH })
  public nickname?: string

  @Field({ nullable: true })
  @MaxLength(256, { message: USER_PROFILE_ERRORS.STATUS_MESSAGE_TOO_LONG })
  public statusMessage?: string
}

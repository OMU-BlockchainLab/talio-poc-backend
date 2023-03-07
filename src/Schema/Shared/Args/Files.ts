import { ArgsType, Field, ID } from 'type-graphql'

import { AttachmentType } from 'Constants/files'

@ArgsType()
export class GenerateAttachmentUploadLinkArgs {
  @Field(() => AttachmentType)
  public type: AttachmentType

  @Field(() => String)
  public name: string

  @Field(() => String)
  public contentType: string

  @Field(() => ID)
  public channelId: string
}

@ArgsType()
export class GenerateAttachmentGetLinkArgs {
  @Field(() => AttachmentType)
  public type: AttachmentType

  @Field(() => String)
  public name: string

  @Field(() => ID)
  public channelId: string
}

import { Args, Ctx, Mutation, Resolver } from 'type-graphql'

import { CHANNEL_ERRORS } from 'Constants/errors'
import { AVAILABLE_ATTACHMENT_MIMES } from 'Constants/files'

import { UserPolicy } from 'Policies'

import {
  GenerateAttachmentGetLinkArgs,
  GenerateAttachmentUploadLinkArgs,
} from 'Schema/Shared/Args/Files'

import SignedUrlType from 'Schema/Types/SignedUrl'

import { ACTIONS, RESOURCES } from 'Services/ACL'
import { ACL } from 'Services/AWS/S3'
import Context from 'Services/Context'
import { CommonError } from 'Services/Errors'
import Files from 'Services/Files'
import { generateFileName } from 'Services/Files/uploadToS3'

@Resolver()
export default class FilesResolver {
  @Mutation(() => SignedUrlType)
  public async generateAttachmentUploadLink(
    @Args() args: GenerateAttachmentUploadLinkArgs,
    @Ctx() ctx: Context,
  ) {
    const user = await ctx.canAccess({
      resource: RESOURCES.CHANNELS,
      action: ACTIONS.UPDATE,
    })

    await UserPolicy.canInteractWithAttachments({
      channelId: args.channelId,
      user,
    })

    if (!AVAILABLE_ATTACHMENT_MIMES[args.type].includes(args.contentType)) {
      throw new CommonError(CHANNEL_ERRORS.WRONG_ATTACHMENT_CONTENT_TYPE)
    }

    return Files.putSignedUrl({
      name: generateFileName(args.name),
      contentType: args.contentType,
      folder: `channels/${args.channelId}/attachment/${args.type}`,
      acl: ACL.private,
    })
  }

  @Mutation(() => SignedUrlType)
  public async generateAttachmentGetLink(
    @Args() args: GenerateAttachmentGetLinkArgs,
    @Ctx() ctx: Context,
  ) {
    const user = await ctx.canAccess({
      resource: RESOURCES.CHANNELS,
      action: ACTIONS.UPDATE,
    })

    await UserPolicy.canInteractWithAttachments({
      channelId: args.channelId,
      user,
    })

    return Files.getSignedUrl({
      name: args.name,
      folder: `channels/${args.channelId}/attachment/${args.type}`,
      expiresIn: 7 * 24 * 60 * 60,
    })
  }
}

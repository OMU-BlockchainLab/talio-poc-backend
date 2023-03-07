import { USER_PROFILE_ERRORS } from 'Constants/errors'
import { FileType } from 'Constants/files'
import { PubSubTopics } from 'Constants/pubSub'

import { EmailCredential, UserProfile } from 'Models'

import TokensService from 'Services/Auth/Tokens'
import SNSService from 'Services/AWS/SNS'
import { Transaction } from 'Services/Db'
import { CommonError } from 'Services/Errors'
import Files from 'Services/Files'
import PubSub from 'Services/PubSub'

export default async function updateUserProfile({
  profile,
  values,
  transaction,
}: {
  profile: UserProfile
  values: {
    nickname?: string
    photoUrl?: string
    backgroundUrl?: string
    email?: string
  }
  transaction?: Transaction
}) {
  if (!profile) {
    throw new CommonError(USER_PROFILE_ERRORS.NOT_FOUND)
  }

  if (
    values.photoUrl !== undefined &&
    profile.photoUrl &&
    profile.photoUrl !== values.photoUrl
  ) {
    await Files.deleteFromS3(profile.photoUrl, FileType.profilePhoto)
  }

  if (
    values.backgroundUrl !== undefined &&
    profile.backgroundUrl &&
    profile.backgroundUrl !== values.backgroundUrl
  ) {
    await Files.deleteFromS3(profile.backgroundUrl, FileType.profileBackground)
  }

  await EmailCredential.update(
    { email: values.email },
    { where: { userId: profile.userId } },
  )
  await TokensService.deleteTokens([profile.userId])

  await profile.update(values, { transaction })

  await SNSService.sendMessage({
    topic: SNSService.topics.app,
    subject: SNSService.subjects.userUpdated,
    message: { userId: profile.userId },
  })

  await PubSub.publish(PubSubTopics.ProfileUpdated, {
    userId: profile.userId,
  })

  return profile
}

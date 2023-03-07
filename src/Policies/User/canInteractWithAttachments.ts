import { QueryTypes } from 'sequelize'

import { CHANNEL_ERRORS } from 'Constants/errors'

import { User } from 'Models'

import { CommonError } from 'Services/Errors'

export default async function canInteractWithAttachments({
  channelId,
  user,
}: {
  channelId: string
  user: User
}) {
  return true
}

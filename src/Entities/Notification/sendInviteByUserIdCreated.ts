import { NotificationKind } from 'Constants/enums'
import { PubSubTopics } from 'Constants/pubSub'

import { Invite } from 'Models'

import OneSignal from 'Services/OneSignal'
import PubSub from 'Services/PubSub'

import { getNickname } from 'Utils/user'

import getUserWithNickname from './getUserWithNickname'

export default async function sendInviteByUserIdCreated(invite: Invite) {
  if (!invite.invitedUserId) return

  await PubSub.publish(PubSubTopics.Notification, {
    kind: NotificationKind.inviteCreated,
    payload: { userId: invite.invitedUserId, inviteId: invite.id },
  })

  const fromUser = await getUserWithNickname(invite.creatorId)

  if (!fromUser) return

  await OneSignal.sendNotification({
    message: `${getNickname(fromUser)} invited you to become a contact`,
    userIds: [invite.invitedUserId],
    data: { inviteId: invite.id },
  })
}

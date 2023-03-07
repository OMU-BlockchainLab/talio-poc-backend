import { Coin, NotificationKind } from 'Constants/enums'
import { PubSubTopics } from 'Constants/pubSub'
import { CoinSymbols } from 'Constants/strings'

import SNSService from 'Services/AWS/SNS'
import OneSignal from 'Services/OneSignal'
import PubSub from 'Services/PubSub'

import { getNickname } from 'Utils/user'

import getUserWithNickname from './getUserWithNickname'

export default async function sendRequestDeclined({
  fromUserId,
  toUserId,
  requestId,
  amount,
  coin,
}: {
  fromUserId: string
  toUserId: string
  coin: Coin
  amount: string
  requestId: string
}) {
  await SNSService.sendMessage({
    topic: SNSService.topics.app,
    subject: SNSService.subjects.requestDeclined,
    message: { requestId },
  })

  await PubSub.publish(PubSubTopics.Notification, {
    kind: NotificationKind.requestDeclined,
    payload: { userId: toUserId, requestId },
  })

  const fromUser = await getUserWithNickname(fromUserId, toUserId)

  if (!fromUser) return

  await OneSignal.sendNotification({
    message: `${getNickname(fromUser)} decline your request for ${amount} ${
      CoinSymbols[coin]
    }`,
    userIds: [toUserId],
    data: { requestId },
  })
}

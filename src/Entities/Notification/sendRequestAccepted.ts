import { Coin, NotificationKind } from 'Constants/enums'
import { PubSubTopics } from 'Constants/pubSub'
import { CoinSymbols } from 'Constants/strings'

import SNSService from 'Services/AWS/SNS'
import OneSignal from 'Services/OneSignal'
import PubSub from 'Services/PubSub'

import { getNickname } from 'Utils/user'

import getUserWithNickname from './getUserWithNickname'

export default async function sendRequestAccepted({
  fromUserId,
  toUserId,
  requestId,
  amount,
  coin,
  transactionId,
}: {
  fromUserId: string
  toUserId: string
  coin: Coin
  amount: string
  requestId: string
  transactionId?: string
}) {
  await SNSService.sendMessage({
    topic: SNSService.topics.app,
    subject: SNSService.subjects.requestAccepted,
    message: { requestId },
  })

  await PubSub.publish(PubSubTopics.Notification, {
    kind: NotificationKind.requestAccepted,
    payload: { userId: toUserId, requestId },
  })

  if (transactionId) {
    await PubSub.publish(PubSubTopics.Notification, {
      kind: NotificationKind.transactionCreated,
      payload: { userId: toUserId, transactionId },
    })
  }

  const fromUser = await getUserWithNickname(fromUserId, toUserId)

  if (!fromUser) return

  await OneSignal.sendNotification({
    message: `${getNickname(fromUser)} accept you request for ${amount} ${
      CoinSymbols[coin]
    } from you`,
    userIds: [toUserId],
    data: { requestId },
  })
}

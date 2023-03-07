import { Coin, NotificationKind } from 'Constants/enums'
import { PubSubTopics } from 'Constants/pubSub'
import { CoinSymbols } from 'Constants/strings'

import OneSignal from 'Services/OneSignal'
import PubSub from 'Services/PubSub'

import { getNickname } from 'Utils/user'

import getUserWithNickname from './getUserWithNickname'

export default async function sendTransactionCreated({
  fromUserId,
  toUserId,
  transactionId,
  amount,
  coin,
}: {
  fromUserId: string
  toUserId: string
  coin: Coin
  amount: string
  transactionId: string
}) {
  await PubSub.publish(PubSubTopics.Notification, {
    kind: NotificationKind.transactionCreated,
    payload: { userId: toUserId, transactionId },
  })

  const fromUser = await getUserWithNickname(fromUserId, toUserId)

  if (!fromUser) return

  await OneSignal.sendNotification({
    message: `${getNickname(fromUser)} send you ${amount} ${CoinSymbols[coin]}`,
    userIds: [toUserId],
    data: { transactionId },
  })
}

import { Coin, NotificationKind } from 'Constants/enums'
import { PubSubTopics } from 'Constants/pubSub'
import { CoinSymbols } from 'Constants/strings'

import OneSignal from 'Services/OneSignal'
import PubSub from 'Services/PubSub'

import { getNickname } from 'Utils/user'

import getUserWithNickname from './getUserWithNickname'

export default async function sendRequestCreated({
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
  await PubSub.publish(PubSubTopics.Notification, {
    kind: NotificationKind.requestCreated,
    payload: { userId: toUserId, requestId },
  })

  const fromUser = await getUserWithNickname(fromUserId, toUserId)

  if (!fromUser) return

  await OneSignal.sendNotification({
    message: `${getNickname(fromUser)} requested ${amount} ${
      CoinSymbols[coin]
    } from you`,
    userIds: [toUserId],
    data: { requestId },
  })
}

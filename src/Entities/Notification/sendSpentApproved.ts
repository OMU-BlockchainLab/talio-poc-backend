import { Coin, NotificationKind } from 'Constants/enums'
import { PubSubTopics } from 'Constants/pubSub'
import { CoinSymbols } from 'Constants/strings'

import OneSignal from 'Services/OneSignal'
import PubSub from 'Services/PubSub'

export default async function sendSpentApproved({
  userId,
  walletId,
  amount,
  coin,
  spender,
}: {
  userId: string
  walletId: string
  amount: number
  coin: Coin
  spender: string
}) {
  await PubSub.publish(PubSubTopics.Notification, {
    kind: NotificationKind.spentApproved,
    payload: { userId, walletId },
  })

  await OneSignal.sendNotification({
    message: `Successfully approved ${spender} to spent ${amount.toFixed(6)} ${
      CoinSymbols[coin]
    }`,
    userIds: [userId],
    data: { walletId },
  })
}

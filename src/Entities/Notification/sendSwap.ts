import { Coin, NotificationKind } from 'Constants/enums'
import { PubSubTopics } from 'Constants/pubSub'
import { CoinSymbols } from 'Constants/strings'

import OneSignal from 'Services/OneSignal'
import PubSub from 'Services/PubSub'

export default async function sendSwap({
  userId,
  walletInId,
  amountIn,
  coinIn,
  walletOutId,
  amountOut,
  coinOut,
}: {
  userId: string
  walletInId: string
  amountIn: number
  coinIn: Coin
  walletOutId: string
  amountOut: number
  coinOut: Coin
}) {
  await PubSub.publish(PubSubTopics.Notification, {
    kind: NotificationKind.swapped,
    payload: { userId, walletInId, walletOutId },
  })

  await OneSignal.sendNotification({
    message: `Successfully swapped ${amountOut.toFixed(6)} ${
      CoinSymbols[coinOut]
    } for ${amountIn.toFixed(6)} ${CoinSymbols[coinIn]}`,
    userIds: [userId],
    data: { walletInId, walletOutId },
  })
}

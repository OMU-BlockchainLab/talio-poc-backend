import { Coin, NotificationKind, StakingPoolName } from 'Constants/enums'
import { PubSubTopics } from 'Constants/pubSub'
import { CoinSymbols } from 'Constants/strings'

import OneSignal from 'Services/OneSignal'
import PubSub from 'Services/PubSub'

export default async function sendStakeCompleted({
  userId,
  walletId,
  amount,
  coin,
  pool,
}: {
  userId: string
  walletId: string
  amount: number
  coin: Coin
  pool: StakingPoolName
}) {
  await PubSub.publish(PubSubTopics.Notification, {
    kind: NotificationKind.stakeCompleted,
    payload: { userId, walletId, pool },
  })

  await OneSignal.sendNotification({
    message: `Stake for ${amount.toFixed(6)} ${
      CoinSymbols[coin]
    } completed for the pool "${pool}"`,
    userIds: [userId],
    data: { walletId, pool },
  })
}

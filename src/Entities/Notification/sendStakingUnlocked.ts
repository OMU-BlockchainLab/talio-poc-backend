import { NotificationKind, StakingPoolName } from 'Constants/enums'
import { PubSubTopics } from 'Constants/pubSub'

import OneSignal from 'Services/OneSignal'
import PubSub from 'Services/PubSub'

export default async function sendStakingUnlocked({
  userId,
  walletId,
  pool,
}: {
  userId: string
  walletId: string
  pool: StakingPoolName
}) {
  await PubSub.publish(PubSubTopics.Notification, {
    kind: NotificationKind.stakingUnlocked,
    payload: { userId, walletId, pool },
  })

  await OneSignal.sendNotification({
    message: `Staking unlocked for the "${pool}"`,
    userIds: [userId],
    data: { walletId, pool },
  })
}

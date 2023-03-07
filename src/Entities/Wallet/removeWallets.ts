import { Wallet } from 'Models'

import { doInTransaction } from 'Services/Db'

interface WalletsParams {
  userId: string
  walletIds: string[]
}
export default async function removeWallets({
  userId,
  walletIds,
}: WalletsParams) {
  return doInTransaction(async transaction => {
    await Wallet.destroy({ where: { userId, id: walletIds }, transaction })

    return true
  })
}

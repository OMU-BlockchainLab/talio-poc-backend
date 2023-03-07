import { Wallet } from 'Models'

import { doInTransaction } from 'Services/Db'

import forEachPromise from 'Utils/forEachPromise'

interface WalletType {
  coin: string
  address: string
  twId?: string
}
interface WalletsParams {
  userId: string
  wallets: WalletType[]
}
export default async function addWallets({ userId, wallets }: WalletsParams) {
  return doInTransaction(async transaction => {
    const createdWallets: Wallet[] = []

    await forEachPromise(wallets, async wallet => {
      createdWallets.push(
        await Wallet.create(
          {
            userId,
            coin: wallet.coin,
            address: wallet.address,
            twId: wallet.twId,
          },
          { transaction },
        ),
      )
    })

    return createdWallets
  })
}

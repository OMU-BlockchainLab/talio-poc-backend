import { Coin } from 'Constants/enums'
import { WALLET_ERRORS } from 'Constants/errors'

import { Wallet } from 'Models'

import { Transaction } from 'Services/Db'
import { CommonError } from 'Services/Errors'

export default async function getByCoin(
  { userId, coin }: { userId: string; coin: Coin },
  transaction?: Transaction,
) {
  const wallet = await Wallet.findOne({ where: { coin, userId }, transaction })

  if (!wallet) throw new CommonError(WALLET_ERRORS.NOT_FOUND)

  return wallet
}

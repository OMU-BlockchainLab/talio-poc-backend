import { WALLET_ERRORS } from 'Constants/errors'

import { Wallet } from 'Models'

import { Transaction } from 'Services/Db'
import { CommonError } from 'Services/Errors'

interface WalletsParams {
  userId: string
  id: string
}
export default async function wallet(
  { userId, id }: WalletsParams,
  transaction?: Transaction,
) {
  const wallet = await Wallet.findOne({ where: { id, userId }, transaction })

  if (!wallet) throw new CommonError(WALLET_ERRORS.NOT_FOUND)

  return wallet
}

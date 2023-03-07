import { USER_ERRORS } from 'Constants/errors'

import User from 'Models/User'

import { Transaction } from 'Services/Db'
import { CommonError } from 'Services/Errors'

export default async function reactivate({
  userId,
  transaction,
}: {
  userId: string
  transaction?: Transaction
}) {
  const user = await User.findOne({ where: { id: userId }, transaction })

  if (!user) throw new CommonError(USER_ERRORS.NOT_FOUND)

  if (!user.deactivationAt)
    throw new CommonError(USER_ERRORS.NO_PENDING_DEACTIVATION)

  await user.update({ deactivationAt: null }, { transaction })

  return user
}

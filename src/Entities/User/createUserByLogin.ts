import { UserProfile } from 'Models'
import User, { UserRole, UserTypeRole } from 'Models/User'

import SNSService from 'Services/AWS/SNS'
import { doInTransaction, Transaction } from 'Services/Db'
import { hashPassword } from 'Services/Password'
import { getRoleIdByRoleName } from 'Services/RBAC'

import acceptInvite from '../Invite/acceptInvite'

export default async function createUserByLogin({
  login,
  password,
  memo,
  inviteToken,
  transaction: tx,
}: {
  login: string
  password: string
  memo?: string
  inviteToken?: string
  transaction?: Transaction
}) {
  const { user, userProfile } = await doInTransaction(async transaction => {
    const createdUser = await User.create(
      {
        role: UserRole.user,
        type: UserTypeRole.user,
        roleId: await getRoleIdByRoleName(UserRole.user),
      },
      { transaction },
    )

    const createdUserProfile = await UserProfile.create(
      { userId: createdUser.id },
      { transaction },
    )

    const memoDigest = memo ? await hashPassword(memo) : null
    const passwordDigest = await hashPassword(password)

    if (inviteToken) {
      await acceptInvite({
        inviteToken,
        userId: createdUser.id,
        silent: true,
        transaction,
      })
    }

    return {
      user: createdUser,
      userProfile: createdUserProfile,
    }
  }, tx)

  await SNSService.sendMessage({
    topic: SNSService.topics.app,
    subject: SNSService.subjects.userSignUp,
    message: { userId: user.id },
  })

  return { user, userProfile }
}

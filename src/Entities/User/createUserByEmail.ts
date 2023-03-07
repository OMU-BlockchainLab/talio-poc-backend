import AuthEmailEntity from 'Entities/Auth/Email'
import NotificationEntity from 'Entities/Notification'
import RoleEntity from 'Entities/Role'

import { EmailCredential, UserProfile } from 'Models'
import { EmailCredentialState } from 'Models/EmailCredential'
import User, { UserRole, UserTypeRole } from 'Models/User'

import { doInTransaction, Transaction } from 'Services/Db'

export default async function createUserByEmail({
  email,
  nickname,
  roleId,
  transaction: tx,
}: {
  email: string
  roleId?: string
  nickname?: string
  transaction?: Transaction
}) {
  const {
    user,
    userProfile,
    emailCredential,
    emailConfirmation,
  } = await doInTransaction(async transaction => {
    const createdUser = await User.create(
      { roleId, type: UserTypeRole.mod },
      { transaction },
    )

    const createdUserProfile = await UserProfile.create(
      { userId: createdUser.id, nickname },
      { transaction },
    )

    const createdEmailCredential = await EmailCredential.create(
      {
        userId: createdUser.id,
        email,
        state: EmailCredentialState.pending,
        isPrimary: true,
      },
      { transaction },
    )

    const createdEmailConfirmation = await AuthEmailEntity.createEmailConfirmationRequest(
      { emailCredential: createdEmailCredential, transaction },
    )

    await NotificationEntity.sendEmailConfirmationRequest({
      emailCredential: createdEmailCredential,
      emailConfirmationRequest: createdEmailConfirmation,
    })

    return {
      user: createdUser,
      userProfile: createdUserProfile,
      emailCredential: createdEmailCredential,
      emailConfirmation: createdEmailConfirmation,
    }
  }, tx)

  return { user, userProfile, emailCredential, emailConfirmation }
}

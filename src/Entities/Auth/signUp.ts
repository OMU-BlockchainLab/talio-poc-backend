/* eslint-disable no-return-await */
import EmailAuth from 'Entities/Auth/Email'
import UserEntity from 'Entities/User'

export default async function signUp({
  email,
  password,
  roleId,
  fullName,
}: {
  email: string
  password: string
  roleId: string
  fullName: string
}) {
  const { emailConfirmation } = await UserEntity.createUserByEmail({
    email,
    roleId,
    nickname: fullName,
  })
  return await EmailAuth.confirmEmail({
    password,
    token: emailConfirmation.token,
  })
}

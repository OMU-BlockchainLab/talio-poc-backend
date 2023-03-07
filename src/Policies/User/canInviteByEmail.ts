import { AUTH_ERRORS } from 'Constants/errors'

import EmailCredential, { EmailCredentialState } from 'Models/EmailCredential'
import { UserTypeRole } from 'Models/User'

import { CommonError } from 'Services/Errors'
import { getRoleNameByRoleId } from 'Services/RBAC'

export default async function canInviteByEmail({
  email,
  roleId,
  nickname,
}: {
  email: string
  roleId?: string
  nickname?: string
}) {
  // if (!allowedRoles.includes(await getRoleNameByRoleId(roleId))) {
  //   throw new CommonError(AUTH_ERRORS.ROLE_NOT_ALLOWED)
  // }

  if ((await getRoleNameByRoleId(roleId)) === UserTypeRole.user) {
    throw new CommonError(AUTH_ERRORS.ROLE_NOT_ALLOWED)
  }

  const activeEmailCredential = await EmailCredential.findOne({
    where: { email, state: EmailCredentialState.active },
  })

  if (activeEmailCredential) {
    throw new CommonError(AUTH_ERRORS.EMAIL_ALREADY_EXISTS)
  }

  return true
}

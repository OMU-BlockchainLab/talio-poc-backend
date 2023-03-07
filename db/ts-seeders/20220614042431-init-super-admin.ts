/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
import '@startupcraft/dotenv-config'
import 'Services/Db'

import { SUPER_ACCOUNT } from 'Config'

import { AUTH_ERRORS } from 'Constants/errors'

import EmailAuth from 'Entities/Auth/Email'
import RoleEntity from 'Entities/Role'
import UserEntity from 'Entities/User'

import EmailCredential, { EmailCredentialState } from 'Models/EmailCredential'
import { RoleStatus } from 'Models/Role'
import { UserRole } from 'Models/User'

import { CommonError } from 'Services/Errors'

require('tsconfig-paths/register')

async function run() {
  const activeEmailCredential = await EmailCredential.findOne({
    where: {
      email: SUPER_ACCOUNT.SUPER_ADMIN_EMAIL,
      state: EmailCredentialState.active,
    },
  })

  if (activeEmailCredential) {
    throw new CommonError(AUTH_ERRORS.EMAIL_ALREADY_EXISTS)
  }

  try {
    const superAdminRole = await RoleEntity.create({
      name: UserRole.superAdmin,
      code: UserRole.superAdmin,
      status: RoleStatus.active,
    })
    const { emailConfirmation } = await UserEntity.createUserByEmail({
      email: SUPER_ACCOUNT.SUPER_ADMIN_EMAIL,
      roleId: superAdminRole?.id,
      nickname: UserRole.superAdmin,
    })
    await EmailAuth.confirmEmail({
      password: SUPER_ACCOUNT.SUPER_ADMIN_PASSWORD,
      token: emailConfirmation.token,
    })
  } catch (e: any) {
    console.log(`Error ${e.message}`)
  }
}

export default run

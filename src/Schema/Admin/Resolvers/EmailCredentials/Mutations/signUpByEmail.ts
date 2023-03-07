/* eslint-disable no-underscore-dangle */
import { ApiPromise, Keyring, WsProvider } from '@polkadot/api'
import { cryptoWaitReady } from '@polkadot/util-crypto'

import { PASS_PHRASE } from 'Config/index'

import AuthEntity from 'Entities/Auth'
import roleEntity from 'Entities/Role'

import { Role } from 'Models'

import { UserPolicy } from 'Policies'

import { SignUpByEmailArgs } from 'Schema/Admin/Args/EmailCredentials'

import OkType from 'Schema/Types/Ok'

import Context from 'Services/Context'

enum OrderRole {
  Organization,
  SysMan,
  User,
}

function parseRoleEnum(nameRole: string): OrderRole {
  switch (nameRole) {
    case 'Organization':
      return OrderRole.Organization
    case 'SysMan':
      return OrderRole.SysMan
    default:
      return OrderRole.User
  }
}

export default async function signUpByEmail(
  ctx: Context,
  args: SignUpByEmailArgs,
) {
  await UserPolicy.canSignUpByEmail(args)

  const user = await AuthEntity.signUp(args)
  console.log('user', user)

  await cryptoWaitReady()

  const role = await roleEntity.findById(args.roleId)
  const keyring = new Keyring({ type: 'sr25519' })

  const root = keyring.addFromUri('//Alice')
  console.log(args)
  // console.log(ctx.);
  const provider = new WsProvider('wss://smartcv.org/smartcv-node')
  //   const provider = new WsProvider('ws://127.0.0.1:9944')
  const api = await ApiPromise.create({ provider })
  try {
    await api.tx.sudo
      .sudo(
        api.tx.account.registerAccount(
          user.getDataValue('id'),
          parseRoleEnum(role?.getDataValue('code')),
        ),
      )
      .signAndSend(root, (result: any) => {
        if (result.status.isFinalized) {
          console.log(
            `Transaction finalized at blockHash ${result.status.asFinalized}`,
          )
          console.log('Register Sucessfully')
        }
      })
  } catch (e) {
    console.log(e)
  }

  return OkType.success
}

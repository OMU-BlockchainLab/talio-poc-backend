/* eslint-disable no-return-await */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
import { ApiPromise, Keyring, WsProvider } from '@polkadot/api'

import { Role, User } from 'Models'

import { Op } from 'Services/Db'

require('tsconfig-paths/register')

// Seed for organization/ sysman verify or not
const run = async () => {
  const users = await User.findAll({
    include: {
      model: Role,
      as: 'roleObj',
      where: {
        code: {
          [Op.or]: ['SysMan', 'Organization'],
        },
      },
    },
  })
  const provider = new WsProvider('wss://smartcv.org/smartcv-node')
  const api = await ApiPromise.create({ provider })

  const accounts = new Map()
  const accountsBc = await api.query.account.accountStorage.entries()

  accountsBc.forEach(account => {
    const key = account[0].toHuman()?.toString() as string
    accounts.set(key, account[1].toString())
  })

  // console.log(users)
  // console.log(accounts)

  await Promise.all(
    users.map(async user => {
      if (accounts.has(user.id)) {
        const account = JSON.parse(accounts.get(user.id))
        if (account?.status === 'Active') {
          await User.update({ isVerified: true }, { where: { id: user.id } })
        }
      }
    }),
  )
}

export default run

/* eslint-disable no-return-await */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
import { ApiPromise, Keyring, WsProvider } from '@polkadot/api'
import { cryptoWaitReady } from '@polkadot/util-crypto'

import { Role, User } from 'Models'

import { Op } from 'Services/Db'

require('tsconfig-paths/register')

// list user
// goi bc weight cua user
// neu role chua co weight thi cap nhat weitht cho role cua user

const run = async () => {
  const users = await User.findAll({
    include: {
      model: Role,
      as: 'roleObj',
      where: {
        code: {
          [Op.like]: '%SysMan%',
        },
      },
    },
  })
  const provider = new WsProvider('wss://smartcv.org/smartcv-node')
  const api = await ApiPromise.create({ provider })
  await Promise.all(
    users.map(
      async user =>
        await User.update(
          { weight: await api.query.hierarchy.roleLayer(user.id) },
          { where: { id: user.id } },
        ),
    ),
  )
}

export default run

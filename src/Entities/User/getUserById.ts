/* eslint-disable no-return-await */
import { Role, User, UserProfile } from 'Models'

import { Transaction as Tx } from 'Services/Db'

export default async function getUser(id: string) {
  return await User.findByPk(id, {
    include: [
      {
        model: UserProfile,
        as: 'profile',
        required: true,
      },
      {
        model: Role,
        as: 'roleObj',
      },
    ],
  })
}

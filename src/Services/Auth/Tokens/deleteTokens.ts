import { TokenKind } from 'Constants/auth'

import { AuthToken } from 'Models'

import { Op, WhereOptions } from 'Services/Db'

import forEachPromise from 'Utils/forEachPromise'

import Session from '../Session'

export default async function deleteTokens(userIds: string[]) {
  const whereOptions: WhereOptions = { userId: { [Op.in]: userIds } }
  const authTokens = await AuthToken.findAll({ where: whereOptions })

  await forEachPromise(authTokens, async authToken => {
    if (authToken.accessKey) {
      await Session.destroy({
        kind: TokenKind.access,
        key: authToken.accessKey,
      })
    }

    if (authToken.refreshKey) {
      await Session.destroy({
        kind: TokenKind.refresh,
        key: authToken.refreshKey,
      })
    }
  })

  await AuthToken.destroy({ where: whereOptions })
}

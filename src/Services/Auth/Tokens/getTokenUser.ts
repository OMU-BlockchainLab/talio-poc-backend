import { TokenKind } from 'Constants/auth'

import { Role, User } from 'Models'

import { verifyJWT } from 'Services/JWT'

import Session from '../Session'

export default async function getTokenUser(token: string) {
  try {
    const payload = await verifyJWT(token)

    const userId = payload?.sub
    const key = payload?.key

    if (!userId || !key) {
      return null
    }

    const sessionUserId = await Session.get({ kind: TokenKind.access, key })

    if (userId !== sessionUserId) {
      return null
    }

    const user = await User.findOne({
      where: { id: userId },
      include: [
        {
          model: Role,
          as: 'roleObj',
        },
      ],
    })

    if (!user) {
      return null
    }

    return user
  } catch (error) {
    return null
  }
}

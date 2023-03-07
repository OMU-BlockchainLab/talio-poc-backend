import { TokenKind } from 'Constants/auth'

import { UnauthorizedError } from 'Services/Errors'
import { verifyJWT } from 'Services/JWT'

import Session from '../Session'

export default async function revokeToken(token: string) {
  const payload = await verifyJWT(token)

  const userId = payload?.sub
  const key = payload?.key

  if (!userId || !key) {
    throw new UnauthorizedError('invalid token')
  }

  await Session.destroy({ kind: TokenKind.access, key })
}

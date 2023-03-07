import ms from 'ms'
import { nanoid } from 'nanoid'

import { EXPIRES } from 'Config'

import { TokenKind } from 'Constants/auth'

import { User } from 'Models'

import { signJWT } from 'Services/JWT'

import Session from '../Session'

export default async function createToken(kind: TokenKind, user: User) {
  const isRefresh = kind === TokenKind.refresh

  const keyLength = isRefresh ? 40 : 12
  const key = nanoid(keyLength)

  const expiresIn = isRefresh ? EXPIRES.REFRESH_TOKEN : EXPIRES.ACCESS_TOKEN
  const lifetime = ms(expiresIn)
  const expiresAt = new Date(Date.now() + lifetime)

  const payload = { sub: user.id, key }
  const token = await signJWT(payload, expiresIn)

  await Session.set({ kind, key, userId: user.id, lifetime })

  return { token, key, expiresAt }
}

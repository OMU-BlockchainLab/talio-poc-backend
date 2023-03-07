import jwt from 'jsonwebtoken'

import { SECRETS } from 'Config'

export async function signJWT(
  payload: Record<string, unknown>,
  expiresIn: string,
) {
  return jwt.sign(payload, SECRETS.JWT, { expiresIn })
}

export async function verifyJWT(token: string): Promise<any> {
  return jwt.verify(token, SECRETS.JWT)
}

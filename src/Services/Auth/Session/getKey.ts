import { TokenKind } from 'Constants/auth'

export default function getKey(kind: TokenKind, key: string) {
  return `jwt:${kind}:${key}`
}

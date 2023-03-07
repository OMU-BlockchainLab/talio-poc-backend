import { User } from 'Models'

export function getNickname(user: User) {
  return user?.contacts?.[0]?.nickname || user.profile?.nickname
}

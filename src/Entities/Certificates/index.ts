// import update from './update'
import userEntity from 'Entities/User'

import create from './create'
import get from './get'
import update from './update'

export default {
  create,
  get,
  update,
}

export async function getRoleNameOfUser(userId: string): Promise<string> {
  const user = await userEntity.getUserById(userId)
  const rs = user?.roleObj?.code ?? ''
  console.log('rs', rs)
  return rs
}

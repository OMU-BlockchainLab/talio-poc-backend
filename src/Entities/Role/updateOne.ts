import { Role } from 'Models'

import findById from './findById'

interface RoleType {
  updatedById?: string
}
export default async function updateOne(body: RoleType, id: string) {
  await Role.update(
    { ...body },
    {
      where: { id },
    },
  )

  return findById(id)
}

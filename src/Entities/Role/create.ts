import { Role } from 'Models'

interface RoleType {
  name: string
  code: string
  status: string
  createdById?: string
}
export default async function create(body: RoleType) {
  const data = await Role.create(body)
  return data
}

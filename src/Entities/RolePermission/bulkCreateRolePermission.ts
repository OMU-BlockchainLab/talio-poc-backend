import { RolePermission } from 'Models'

export default async function bulkCreateRolePermission(data: any) {
  return RolePermission.bulkCreate(data)
}

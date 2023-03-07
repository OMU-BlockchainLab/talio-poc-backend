import { Permission } from 'Models'

export default async function bulkCreateRolePermission(data: any) {
  return Permission.bulkCreate(data)
}

import { RolePermission } from 'Models'

export default async function findRolePermissions(query: any) {
  return RolePermission.findAll({
    where: {
      ...query,
    },
    raw: true,
  })
}

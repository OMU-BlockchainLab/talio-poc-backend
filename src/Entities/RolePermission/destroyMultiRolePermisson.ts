import { RolePermission } from 'Models'

export default async function destroyMultiRolePermisson(query: any) {
  return RolePermission.destroy({
    where: query,
  })
}

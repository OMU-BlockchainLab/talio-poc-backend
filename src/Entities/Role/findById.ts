import { Permission, Role } from 'Models'

export default async function findById(id?: string) {
  const data = await Role.findByPk(id, {
    include: {
      model: Permission,
      as: 'permissions',
      attributes: {
        exclude: ['RolePermission'],
        include: ['id', 'name', 'code', 'status'],
      },
    },
  })
  return data
}

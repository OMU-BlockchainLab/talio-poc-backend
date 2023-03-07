import { Permission, Role } from 'Models'

export default async function findAll(request: any) {
  return Role.findAndCountAll({
    where: request,
    include: {
      model: Permission,
      as: 'permissions',
      attributes: {
        exclude: ['RolePermission'],
        include: ['id', 'name', 'code', 'status'],
      },
    },
    attributes: {
      exclude: request.excludes,
      include: request.includes,
    },
  })
}

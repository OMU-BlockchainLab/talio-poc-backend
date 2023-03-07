import { Role } from 'Models'

export default async function findOne(query: any) {
  return Role.findOne({
    where: {
      ...query,
    },
  })
}

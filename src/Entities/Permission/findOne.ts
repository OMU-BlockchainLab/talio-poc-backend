import Permission from 'Models/Permission'

export default async function findOne(query: any) {
  return Permission.findOne({
    where: {
      ...query,
    },
    raw: true,
  })
}

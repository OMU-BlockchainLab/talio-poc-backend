import { Permission } from 'Models'

export default async function findById(id: string) {
  const data = await Permission.findByPk(id, {
    // raw: true
  })

  return data
}

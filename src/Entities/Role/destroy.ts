import { Role } from 'Models'

export default async function destroy(id: string) {
  return Role.destroy({ where: { id } })
}

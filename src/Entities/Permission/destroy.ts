import Permission from 'Models/Permission'

export default async function destroy(id: string) {
  return Permission.destroy({ where: { id } })
}

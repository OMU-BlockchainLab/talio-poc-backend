import Permission from 'Models/Permission'

export default async function findAll(request: any) {
  // const condition = queryBuilderGetList(request)
  const { count, rows } = await Permission.findAndCountAll({
    where: request,
    // attributes: {
    //   exclude: request.excludes,
    //   include: request.includes,
    // },
  })

  return {
    count,
    pages: 1,
    rows,
  }
}

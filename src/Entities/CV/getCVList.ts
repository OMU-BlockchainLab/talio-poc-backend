import Pagination from 'Interfaces/Pagination'
import Sort from 'Interfaces/Sort'

import { User } from 'Models'
import CV from 'Models/CV'

import { Op } from 'Services/Db'

import { getOrder } from 'Utils/db'

const orderColumnsMap: Record<string, string> = {
  nickname: 'profile.nickname',
  role: 'role',
}

interface GetCVListParams extends Pagination {
  search?: string
  sort?: Sort[]
  excludeIds?: string[]
}
export default async function getCVList({
  search,
  sort,
  page,
  limit,
  excludeIds,
}: GetCVListParams) {
  const limitRecords = limit || 10
  const currentPage = page || 0
  const searchField = search || ''

  const searchPattern = `%${searchField}%`

  const { count, rows } = await CV.findAndCountAll({
    where: {
      ...(excludeIds ? { id: { [Op.notIn]: excludeIds } } : {}),
    },
    include: [
      {
        model: User,
        as: 'user',
      },
    ],
    offset: currentPage * limitRecords,
    limit: limitRecords,
    order: getOrder({ sort, orderColumnsMap }),
  })

  return {
    count,
    pages: Math.ceil(count / limitRecords),
    rows,
  }
}

import Pagination from 'Interfaces/Pagination'
import Sort from 'Interfaces/Sort'

import Certificate from 'Models/Certificate'

import { OrderRole } from 'Services/Constant'
import { Op } from 'Services/Db'

import { getOrder } from 'Utils/db'

import { getRoleNameOfUser } from '.'

const orderColumnsMap: Record<string, string> = {
  nickname: 'profile.nickname',
  role: 'role',
}

interface GetCVListParams extends Pagination {
  search?: string
  sort?: Sort[]
  excludeIds?: string[]
  userId: string
  issuer?: string
}

export default async function get({
  search,
  sort,
  page,
  limit,
  excludeIds,
  userId,
  issuer,
}: GetCVListParams) {
  console.log(
    'OrderRole.Organization.toString()',
    OrderRole.Organization.toString(),
  )
  console.log(userId)

  // console.log(await getRoleNameOfUser(userId))
  // if ((await getRoleNameOfUser(userId)) !== OrderRole.Organization)
  //   throw new Error('Current user is not an orgnization')
  const limitRecords = limit || 10
  const currentPage = page || 0

  const { count, rows } = await Certificate.findAndCountAll({
    where: {
      ...(excludeIds ? { id: { [Op.notIn]: excludeIds } } : {}),
      ...(issuer ? { issuer } : {}),
      ...(userId ? { userId } : {}),
    },
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

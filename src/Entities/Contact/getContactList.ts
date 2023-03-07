import Pagination from 'Interfaces/Pagination'
import Sort from 'Interfaces/Sort'

import { Contact, User, UserProfile } from 'Models'

import { col, Op, where } from 'Services/Db'

import { getOrder } from 'Utils/db'

const orderColumnsMap: Record<string, string> = {
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  phone: 'phone',
  nickname: 'user.profile.nickname',
}

interface GetContactListParams extends Pagination {
  creatorId: string
  blocked?: boolean
  search?: string
  sort?: Sort[]
}
export default async function getContactList({
  creatorId,
  blocked,
  search,
  sort,
  page,
  limit,
}: GetContactListParams) {
  const limitRecords = limit || 10
  const currentPage = page || 0
  const searchField = search || ''

  const searchPattern = `%${searchField}%`

  const { count, rows } = await Contact.findAndCountAll({
    where: {
      creatorId,
      blockedAt: blocked ? { [Op.ne]: null } : null,
      ...(searchField && {
        [Op.or]: [
          where(col('phone'), 'ilike', searchPattern),
          where(col('"user"."profile".nickname'), 'ilike', searchPattern),
        ],
      }),
    },
    include: [
      {
        model: User,
        as: 'user',
        required: true,
        include: [
          {
            model: UserProfile,
            as: 'profile',
            required: false,
          },
        ],
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

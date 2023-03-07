import Pagination from 'Interfaces/Pagination'
import Sort from 'Interfaces/Sort'

import { Invite, User, UserProfile } from 'Models'

import { col, Op, where } from 'Services/Db'

import { getOrder } from 'Utils/db'

const orderColumnsMap: Record<string, string> = {
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  phone: 'invitedPhone',
  nickname: 'creator.profile.nickname',
}

interface GetInviteListParams extends Pagination {
  userId: string
  search?: string
  sort?: Sort[]
}
export default async function getInviteList({
  userId,
  search,
  sort,
  page,
  limit,
}: GetInviteListParams) {
  const limitRecords = limit || 10
  const currentPage = page || 0
  const searchField = search || ''

  const searchPattern = `%${searchField}%`

  const { count, rows } = await Invite.findAndCountAll({
    where: {
      invitedUserId: userId,
      acceptedAt: null,
      ...(searchField && {
        [Op.or]: [
          where(col('invited_phone'), 'ilike', searchPattern),
          where(col('"creator"."profile".nickname'), 'ilike', searchPattern),
        ],
      }),
    },
    include: [
      {
        model: User,
        as: 'creator',
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

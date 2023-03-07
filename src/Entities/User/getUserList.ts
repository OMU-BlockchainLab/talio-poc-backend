/* eslint-disable no-nested-ternary */
import Pagination from 'Interfaces/Pagination'
import Sort from 'Interfaces/Sort'

import { Role, UserProfile } from 'Models'
import User, { UserRole, UserTypeRole } from 'Models/User'

import { col, Op, where } from 'Services/Db'

import { getOrder } from 'Utils/db'

const orderColumnsMap: Record<string, string> = {
  nickname: 'profile.nickname',
  role: 'role',
}

interface GetUserListParams extends Pagination {
  search?: string
  sort?: Sort[]
  userTypeRoles?: UserTypeRole[]
  excludeIds?: string[]
  currentWeight: number
  roleCode: string
  outputRoleCode?: string
}
export default async function getUserList({
  userTypeRoles,
  search,
  sort,
  page,
  limit,
  excludeIds,
  currentWeight,
  roleCode,
  outputRoleCode,
}: GetUserListParams) {
  const limitRecords = limit || 10
  const currentPage = page || 0
  const searchField = search || ''

  const searchPattern = `%${searchField}%`

  const { count, rows } = await User.findAndCountAll({
    where: {
      ...(excludeIds ? { id: { [Op.notIn]: excludeIds } } : {}),
      ...(userTypeRoles ? { type: userTypeRoles } : {}),
      ...(searchField && {
        [Op.or]: [where(col('"profile".nickname'), 'ilike', searchPattern)],
      }),
      ...(currentWeight !== undefined
        ? currentWeight === 0
          ? {
              [Op.or]: [{ weight: { [Op.eq]: 0 } }, { weight: null }],
            }
          : {
              [Op.or]: [
                {
                  weight: {
                    [Op.gte]: currentWeight,
                  },
                },
                {
                  weight: {
                    [Op.eq]: 0,
                  },
                },
                { weight: null },
              ],
            }
        : {}),
    },
    include: [
      {
        model: UserProfile,
        as: 'profile',
        required: true,
      },
      {
        model: Role,
        as: 'roleObj',
        where: {
          ...(roleCode.toLowerCase() === UserRole.organization
            ? {
                code: roleCode,
              }
            : roleCode.toLowerCase() === UserRole.user
            ? {
                code: [
                  UserRole.user,
                  UserRole.organization,
                  UserRole.Organization,
                ],
              }
            : roleCode.toLowerCase() === UserRole.sysman
            ? {
                code: [
                  UserRole.user,
                  UserRole.organization,
                  UserRole.Organization,
                  UserRole.sysman,
                  UserRole.sysMan,
                  UserRole.SysMan,
                  UserRole.Sysman,
                ],
              }
            : {}),
          ...(outputRoleCode && {
            code: outputRoleCode,
          }),
        },
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

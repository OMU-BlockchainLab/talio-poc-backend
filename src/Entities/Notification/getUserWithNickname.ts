import { Includeable } from 'sequelize'

import { Contact, User, UserProfile } from 'Models'

export default async function getUserWithNickname(
  fromUserId: string,
  toUserId?: string,
) {
  const include: Includeable[] = [
    {
      attributes: ['userId', 'nickname'],
      model: UserProfile,
      as: 'profile',
      required: true,
    },
  ]

  if (toUserId) {
    include.push({
      attributes: ['creatorId', 'userId', 'nickname'],
      model: Contact,
      as: 'contacts',
      where: { creatorId: toUserId, userId: fromUserId },
      required: false,
    })
  }

  return User.findOne({
    where: { id: fromUserId },
    include,
  })
}

/* eslint-disable no-return-await */
import { User } from 'Models'

import { UpdateUserArgs } from 'Schema/Admin/Args/Users'

export default async function updateUser(request: UpdateUserArgs) {
  return await User.update(
    {
      isVerified: request.isVerified,
      state: request.state,
      weight: request.weight,
    },
    { where: { id: request.ids } },
  )
}

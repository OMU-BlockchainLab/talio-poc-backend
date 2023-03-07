/* eslint-disable no-return-await */
import { CV } from 'Models'

import { UpdateCVArgs } from 'Schema/Admin/Args/CV'

export default async function updateCV(request: UpdateCVArgs) {
  return await CV.update(
    { isVerified: request.isVerified },
    { where: { id: request.ids } },
  )
}

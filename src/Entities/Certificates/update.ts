/* eslint-disable no-return-await */
import { Certificate } from 'Models'

import { UpdateCertArgs } from 'Schema/Admin/Args/Cert'

export default async function updateCertificates(request: UpdateCertArgs) {
  const rs = await Certificate.update(
    { isVerified: request.isVerified, blockchainId: request.blockchainId },
    { where: { id: request.ids } },
  )
  return rs
}

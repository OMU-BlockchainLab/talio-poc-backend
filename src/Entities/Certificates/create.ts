import Certificate from 'Models/Certificate'

import { OrderRole } from 'Services/Constant'
import { Transaction } from 'Services/Db'

import { getRoleNameOfUser } from '.'

export default async function create({
  certUrl,
  userId,
  dateOfIssued,
  name,
  issuer,
  blockchainId,
  transaction: tx,
}: {
  certUrl?: string
  userId?: string
  issuer?: string
  dateOfIssued?: Date
  name?: string
  blockchainId: string
  transaction?: Transaction
}) {
  const roleCode = await getRoleNameOfUser(userId ?? '')
  if (
    roleCode.toUpperCase() !== OrderRole.Organization.toUpperCase() &&
    roleCode.toUpperCase() !== OrderRole.User.toUpperCase()
  )
    throw new Error('Current user is not an orgnization or user')
  const isPubic = true
  const cert = await Certificate.create({
    certUrl,
    userId,
    name,
    dateOfIssued,
    issuer,
    isPubic,
    blockchainId,
  })

  return cert
}

import path from 'path'

import S3, { ACL } from 'Services/AWS/S3'

interface GetSignedUrlParams {
  name: string
  folder: string
  expiresIn?: number
}

interface PutSignedUrlParams {
  name: string
  contentType: string
  folder: string
  expiresIn?: number
  acl?: ACL
}

export async function getSignedUrl({
  name,
  folder,
  expiresIn,
}: GetSignedUrlParams) {
  const key = path.normalize(`${folder}/${name}`)

  return S3.signedUrlForGet(key, expiresIn)
}

export async function putSignedUrl({
  name,
  contentType,
  folder,
  acl,
  expiresIn,
}: PutSignedUrlParams) {
  const key = path.normalize(`${folder}/${name}`)

  return S3.signedUrlForPut({ key, contentType, acl, expiresIn })
}

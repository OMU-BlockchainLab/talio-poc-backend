import fs from 'fs'
import { nanoid } from 'nanoid'
import path from 'path'

import { AWS } from 'Config'

import { FileToUpload } from 'Interfaces/File'

import S3, { ACL } from 'Services/AWS/S3'
import { CommonError } from 'Services/Errors'
import { createScopedLog } from 'Services/Log'

const log = createScopedLog('[uploadFile]')

interface UploadToS3Params {
  file: FileToUpload
  folder: string
  acl?: ACL
}

export function generateFileName(fileName: string) {
  const { ext } = path.parse(fileName)
  return `${nanoid(24)}${ext}`
}

function getUrlFromBucket(key: string) {
  const regionString = AWS.REGION.includes('us-east-1') ? '' : `-${AWS.REGION}`

  return `https://${AWS.S3_BUCKET}.s3${regionString}.amazonaws.com/${key}`
}

export async function uploadToS3({
  file,
  folder,
  acl = ACL.publicRead,
}: UploadToS3Params) {
  const key = path.normalize(`${folder}/${file.name}`)

  await S3.upload({
    key,
    body: fs.createReadStream(file.path),
    contentType: file.type,
    acl,
  })

  const s3Path = getUrlFromBucket(key)

  log.debug(`file uploaded: ${s3Path}`)

  if (!s3Path) {
    throw new CommonError('S3 file upload response is malformed')
  }

  return s3Path
}

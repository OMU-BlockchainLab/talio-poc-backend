import {
  DeleteObjectsCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { DateTime } from 'luxon'
import { Readable } from 'stream'

import { AWS } from 'Config'

import { CommonError } from 'Services/Errors'
import log from 'Services/Log'

export enum ACL {
  private = 'private',
  publicRead = 'public-read',
  ownerRead = 'bucket-owner-read',
}

const s3 = new S3Client({ region: AWS.REGION })

async function signedUrlForGet(key: string, expiresIn = 3600) {
  try {
    const command = new GetObjectCommand({
      Bucket: AWS.S3_BUCKET,
      Key: key,
    })

    return {
      url: getSignedUrl(s3, command, { expiresIn }),
      expiresAt: DateTime.now().plus({ seconds: expiresIn }).toJSDate(),
    }
  } catch (error) {
    log.error(`cannot sign url for get: ${error.message}`, { error, key })
    throw new CommonError(`cannot sign url for get: ${error.message}`)
  }
}

interface SignedUrlForPutParams {
  key: string
  expiresIn?: number
  contentType?: string
  acl?: ACL
}
async function signedUrlForPut(params: SignedUrlForPutParams) {
  try {
    const command = new PutObjectCommand({
      Bucket: AWS.S3_BUCKET,
      Key: params.key,
      ContentType: params.contentType,
      ACL: params.acl || ACL.private,
    })

    const expiresIn = params.expiresIn || 60

    return {
      url: getSignedUrl(s3, command, { expiresIn }),
      expiresAt: DateTime.now().plus({ seconds: expiresIn }).toJSDate(),
    }
  } catch (error) {
    log.error(`cannot sign url for put: ${error.message}`, { error, params })
    throw new CommonError(`cannot sign url for put: ${error.message}`)
  }
}

interface UploadParams {
  key: string
  body: Readable | string
  contentType: string
  acl?: ACL
}
async function upload(params: UploadParams) {
  try {
    const command = new PutObjectCommand({
      Bucket: AWS.S3_BUCKET,
      Key: params.key,
      Body: params.body,
      ContentType: params.contentType,
      ACL: params.acl || ACL.private,
    })

    return s3.send(command)
  } catch (error) {
    log.error(`cannot upload to s3: ${error.message}`, { error, params })

    throw new CommonError(`cannot upload to s3: ${error.message}`)
  }
}

async function bulkDelete(keys: string[]) {
  try {
    const command = new DeleteObjectsCommand({
      Bucket: AWS.S3_BUCKET,
      Delete: { Objects: keys.map(Key => ({ Key })) },
    })

    return s3.send(command)
  } catch (error) {
    log.error(`cannot delete from s3: ${error.message}`, { error, keys })

    throw new CommonError(`cannot delete from s3: ${error.message}`)
  }
}

export default {
  ACL,
  signedUrlForGet,
  signedUrlForPut,
  upload,
  bulkDelete,
}

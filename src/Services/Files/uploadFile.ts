import { FileType } from 'Constants/files'

import { FileToUpload } from 'Interfaces/File'

import { CommonError } from 'Services/Errors'

import mapPromise from 'Utils/mapPromise'

import { generateImages } from './imagesForType'
import { uploadToS3 } from './uploadToS3'

interface UploadFileParams {
  file: FileToUpload
  type: FileType
  userId: string
  entityId?: string
}

const IMAGE_TYPES = [
  FileType.profilePhoto,
  FileType.profileBackground,
  FileType.channelBackground,
]

export function getFileFolder(params: UploadFileParams) {
  switch (params.type) {
    case FileType.profilePhoto:
      return `users/${params.userId}/profilePhoto`
    case FileType.profileBackground:
      return `users/${params.userId}/profileBackground`
    case FileType.channelBackground:
      return `channel/${params.entityId}/background`
    default:
      return ''
  }
}

export default async function uploadFile({
  file,
  type,
  userId,
  entityId,
}: UploadFileParams) {
  if (!IMAGE_TYPES.includes(type)) {
    throw new CommonError(`No handler for type "${type}"`)
  }

  const images = await generateImages(file, type)

  const [image] = await mapPromise(images, async item =>
    uploadToS3({
      file: item,
      folder: getFileFolder({ file, type, userId, entityId }),
    }),
  )

  return image
}

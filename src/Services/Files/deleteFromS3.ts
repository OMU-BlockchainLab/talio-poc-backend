import path from 'path'

import mapValues from 'lodash/mapValues'

import { FileType, IMAGE_SIZES } from 'Constants/files'

import S3 from 'Services/AWS/S3'

function getKeyForSize(filePath: string, size: number) {
  const { dir, name, ext } = path.parse(filePath)

  const fileName = `${name}_${size}${ext}`

  return path.normalize(`${dir}/${fileName}`)
}

function getSizeKeyList(filePath: string, type: FileType) {
  const list = [filePath]

  const imageSizes = IMAGE_SIZES[type]

  if (imageSizes) {
    return list.concat(
      Object.values(
        mapValues(imageSizes, (size: number) => getKeyForSize(filePath, size)),
      ),
    )
  }

  return list
}

export default async function deleteFromS3(
  filePath: string,
  fileType: FileType,
) {
  const url = new URL(filePath)

  await S3.bulkDelete(getSizeKeyList(url.pathname.replace('/', ''), fileType))

  return true
}

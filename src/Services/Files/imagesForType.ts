import mapValues from 'lodash/mapValues'

import { FileType, IMAGE_SIZES } from 'Constants/files'

import { FileToUpload } from 'Interfaces/File'

import { CommonError } from 'Services/Errors'

import forEachPromise from 'Utils/forEachPromise'

import fixRotation from './fixRotation'
import resizeImage, { addSizePostfix } from './resizeImage'
import { generateFileName } from './uploadToS3'

export function getAvailableSizes(type: FileType) {
  const imageSizes = IMAGE_SIZES[type]

  if (!imageSizes) throw new CommonError('Image size not found')

  return imageSizes
}

export function getGraphQLAvailableSizes(type: FileType) {
  return `Available sizes: [${Object.keys(getAvailableSizes(type)).join(',')}]`
}

export async function generateImages(
  file: FileToUpload,
  type: FileType,
): Promise<FileToUpload[]> {
  const imageSizes = getAvailableSizes(type)

  const nextFile = await fixRotation({
    ...file,
    name: generateFileName(file.name),
  })

  const images: FileToUpload[] = [nextFile]

  await forEachPromise(Object.values(imageSizes), async (size: number) => {
    const image = await resizeImage({ file: nextFile, size })
    images.push(image)
  })

  return images
}

export function getSizePaths(filePath: string, type: FileType) {
  const imageSizes = getAvailableSizes(type)

  return {
    initial: filePath,
    sizes: mapValues(imageSizes, (size: number) =>
      addSizePostfix(filePath, size),
    ),
  }
}

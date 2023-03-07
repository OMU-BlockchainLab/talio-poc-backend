import path from 'path'
import sharp from 'sharp'

import { FileToUpload } from 'Interfaces/File'

interface ResizeImageParams {
  file: FileToUpload
  size: number
  fit?: keyof sharp.FitEnum
}

export function addSizePostfix(filePath: string, size: number) {
  const { dir, name, ext } = path.parse(filePath)

  const fileName = `${name}_${size}${ext}`

  return { name: fileName, path: path.normalize(`${dir}/${fileName}`) }
}

export default async function resizeImage({
  file,
  size,
  fit,
}: ResizeImageParams): Promise<FileToUpload> {
  const image = sharp(file.path)

  const { width, height } = await image.metadata()

  const cropSize = Math.min(width || size, height || size, size)

  const { name: resizedFileName } = addSizePostfix(file.name, size)

  const resizeOptions = {
    fit: fit || sharp.fit.cover,
    withoutEnlargement: true,
    kernel: sharp.kernel.mitchell,
  }

  const filePath = `${path.dirname(file.path)}/${path.basename(
    file.path,
  )}_${size}`

  await image
    .withMetadata()
    .resize(cropSize, cropSize, resizeOptions)
    .toFile(filePath)

  return { ...file, path: filePath, name: resizedFileName }
}

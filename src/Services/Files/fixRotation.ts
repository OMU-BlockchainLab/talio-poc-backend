import sharp from 'sharp'

import { FileToUpload } from 'Interfaces/File'

export default async function fixRotation(
  file: FileToUpload,
): Promise<FileToUpload> {
  const filePath = `${file.path}_fixed`

  await sharp(file.path).withMetadata().rotate().toFile(filePath)

  return { ...file, path: filePath }
}

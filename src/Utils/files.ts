interface File {
  name: string
  contentType: string
  size?: number
}

export function isNonZeroSizeFile(file: File) {
  const { size } = file
  return !!size && size > 0
}

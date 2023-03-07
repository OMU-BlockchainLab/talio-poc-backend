export const mockSNSPublish = jest.fn(() => ({
  promise: () => Promise.resolve(),
}))

export const mockS3GetSignedUrl = jest.fn(params => {
  const baseUrl = 'https://mock.s3.amazonaws.com/s3'
  return `${baseUrl}/${params.Key}`
})
export const mockS3Upload = jest.fn(() => ({
  promise: () => Promise.resolve(),
}))

export const SNS = jest.fn(() => ({
  publish: mockSNSPublish,
}))
export const SQS = jest.fn(() => ({}))
export const S3 = jest.fn(() => ({
  getSignedUrl: mockS3GetSignedUrl,
  upload: mockS3Upload,
}))

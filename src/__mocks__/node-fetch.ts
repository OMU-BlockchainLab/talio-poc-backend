export const mockFetchJSON = jest.fn(async () => ({}))

export const mockFetch = jest.fn(() => ({
  json: mockFetchJSON,
}))

export default mockFetch

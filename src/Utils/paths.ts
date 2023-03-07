import url from 'url'

export function parseUrl(urlString: string) {
  return url.parse(urlString)
}

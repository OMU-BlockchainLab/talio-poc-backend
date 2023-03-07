import map from 'lodash/map'

interface Handler<T> {
  (item: T, index: number): Promise<any>
}

export default function mapPromise<T>(arr: T[], handler: Handler<T>) {
  return Promise.all(map(arr, handler))
}

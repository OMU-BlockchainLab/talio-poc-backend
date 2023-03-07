import { User } from 'Models'

declare module 'koa' {
  interface Context {
    dataLoaders?: any
    user: User | null
  }
}

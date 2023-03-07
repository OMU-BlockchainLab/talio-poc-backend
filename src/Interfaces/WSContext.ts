import { Context } from 'graphql-ws'

import { User } from 'Models'

export default interface WSContext extends Context {
  user: User | null
}

import { DateTime } from 'luxon'

export interface TokenInfo {
  name: string
  symbol: string
  price: string
  priceBNB: string
  updatedAt: DateTime
}

import { SortInputOrder } from 'Constants/enums'

export default interface Sort {
  column: string
  order: SortInputOrder
}

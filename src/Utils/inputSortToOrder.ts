import { OrderItem } from 'sequelize'

import filter from 'lodash/filter'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'

interface SortParam {
  column: string
  order?: string
}

interface ColumnConfig {
  [key: string]: OrderItem
}

interface InputSortToOrderParams {
  sort?: SortParam[]
  columns: ColumnConfig
  defaultSort: SortParam[]
}

export default function inputSortToOrder(params: InputSortToOrderParams) {
  const availableColumns = Object.keys(params.columns)
  const availableDirs = ['asc', 'desc']

  const sortItemToOrderItem = (sortItem: SortParam): OrderItem => {
    const { column, order } = sortItem
    const columnConfig = params.columns[column]

    const dir =
      order && availableDirs.includes(order) ? order : availableDirs[0]
    if (Array.isArray(columnConfig)) {
      return [...columnConfig, dir] as OrderItem
    }
    return [columnConfig, dir]
  }

  const filteredSort = filter(
    params.sort,
    sortItem => !!sortItem.column && availableColumns.includes(sortItem.column),
  )

  if (isEmpty(filteredSort)) {
    return map(params.defaultSort, sortItemToOrderItem)
  }

  return map<SortParam, OrderItem>(filteredSort, sortItemToOrderItem)
}

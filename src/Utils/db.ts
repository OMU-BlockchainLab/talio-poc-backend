import { Order, OrderItem } from 'sequelize'

import reduce from 'lodash/reduce'

import Sort from 'Interfaces/Sort'

import db, { literal } from 'Services/Db'

export async function truncateAll() {
  return db.query(
    `TRUNCATE TABLE ${Object.values(db.models)
      .map(model => model.tableName)
      .join(',')} RESTART IDENTITY CASCADE;`,
  )
}

export function getOrder({
  orderColumnsMap,
  sort,
  defaultOrder = [['updatedAt', 'desc']],
}: {
  orderColumnsMap: Record<string, string>
  sort?: Sort[]
  defaultOrder?: Order
}) {
  const order = reduce(
    sort,
    (acc: OrderItem[], { column, order }) => {
      const col = orderColumnsMap[column]
      if (col) acc.push(literal(`"${col}" ${order}`))
      return acc
    },
    [],
  )

  return order.length > 0 ? order : defaultOrder
}

import chalk from 'chalk'
import {
  cast,
  col,
  FindOptions,
  fn,
  literal,
  Op,
  QueryTypes,
  Transaction,
  where,
  WhereOptions,
} from 'sequelize'
import { Sequelize } from 'sequelize-typescript'

import { DATABASE, IS_DEVELOPMENT, IS_TEST } from 'Config'

import * as Models from 'Models'

import log from 'Services/Log'

const dbLogger = (sql: string, timing?: number) => {
  log.debug('%s %s', chalk.magenta(`SQL (${timing}ms)`), chalk.cyan(sql))
}
const sequelize = new Sequelize(DATABASE.URL, {
  logging: DATABASE.LOGGING_DISABLED ? undefined : dbLogger,
  benchmark: IS_DEVELOPMENT,
  pool: {
    max: 10,
    min: 5,
    acquire: 30000,
    idle: 10000,
  },
})

sequelize.addModels(Object.values(Models))

log.info('🗂  Sequelize initialized')

// Util db functions
export const ago = (duration: string) =>
  literal(`now() - interval '${duration}'`)

export const avg = (columnName: string, asName: string): [any, string] => [
  fn('avg', col(columnName)),
  asName,
]

export const count = (columnName: string, asName: string): [any, string] => [
  fn('count', col(columnName)),
  asName,
]

export const sum = (columnName: string, asName: string): [any, string] => [
  fn('sum', col(columnName)),
  asName,
]

export const now = () => fn('now')

interface Callback {
  (transaction: Transaction): any
}

export function doInTransaction(callback: Callback, transaction?: Transaction) {
  return transaction ? callback(transaction) : sequelize.transaction(callback)
}

export {
  cast,
  col,
  FindOptions,
  fn,
  literal,
  Op,
  QueryTypes,
  Transaction,
  where,
  WhereOptions,
}

export default sequelize

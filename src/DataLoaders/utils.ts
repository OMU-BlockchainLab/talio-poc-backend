import DataLoader, { Options } from 'dataloader'

import get from 'lodash/get'
import groupBy from 'lodash/groupBy'
import reduce from 'lodash/reduce'

import { FindOptions, Op } from 'Services/Db'

export type Key = string
export type ComplexKey = Record<string, string | boolean>
export type CacheKey = string

interface BaseParams<T> {
  model: any
  findOptions?: FindOptions
}

interface ByParams<T> extends BaseParams<T>, Options<Key, T, CacheKey> {
  field: string
  cacheKeyFn?: (key: Key) => CacheKey
}

interface AllByParams<T> extends BaseParams<T>, Options<Key, T[], CacheKey> {
  field: string
  transform?: (item: any) => T[]
  cacheKeyFn?: (key: Key) => CacheKey
}

function findRows<T>(
  params: ByParams<T> | AllByParams<T>,
  keys: readonly Key[],
) {
  const findOptions = params.findOptions || {}
  return params.model.findAll({
    ...findOptions,
    where: { ...findOptions.where, [params.field]: keys },
  })
}

export function by<T>(params: ByParams<T>) {
  return new DataLoader<Key, T, CacheKey>(async (keys: readonly Key[]) => {
    const rows = await findRows(params, keys)

    const rowsHash: Record<CacheKey, T> = reduce(
      rows,
      (acc: Record<CacheKey, T>, item: T) => {
        const field = get(item, params.field)
        acc[params.cacheKeyFn ? params.cacheKeyFn(field) : field] = item
        return acc
      },
      {},
    )

    return keys.map(
      (key: Key) =>
        rowsHash?.[params.cacheKeyFn ? params.cacheKeyFn(key) : key],
    )
  }, params)
}

interface ComplexByParams<T>
  extends BaseParams<T>,
    Options<ComplexKey, T, CacheKey> {
  fields: string[]
  cacheKeyFn: (key: ComplexKey) => CacheKey
}

interface ComplexAllByParams<T>
  extends BaseParams<T>,
    Options<ComplexKey, T[], CacheKey> {
  fields: string[]
  cacheKeyFn: (key: ComplexKey) => CacheKey
}

function findComplexRows<T>(
  params: ComplexByParams<T> | ComplexAllByParams<T>,
  keys: readonly ComplexKey[],
) {
  const findOptions = params.findOptions || {}

  const and: Record<string, string[]> = reduce(
    params.fields,
    (acc: Record<string, string[]>, field) => {
      acc[field] = Object.keys(groupBy(keys, field))
      return acc
    },
    {},
  )

  return params.model.findAll({
    ...findOptions,
    where: { ...findOptions.where, [Op.and]: and },
  })
}

export function complexBy<T>(params: ComplexByParams<T>) {
  return new DataLoader<ComplexKey, T, CacheKey>(
    async (keys: readonly ComplexKey[]) => {
      const rows = await findComplexRows(params, keys)

      const cacheKeys: CacheKey[] = keys.map(params.cacheKeyFn)

      const rowsHash: Record<CacheKey, T> = reduce(
        rows,
        (acc: Record<CacheKey, T>, item: T) => {
          acc[params.cacheKeyFn(item as any)] = item
          return acc
        },
        {},
      )

      return cacheKeys.map((key: CacheKey) => rowsHash?.[key])
    },
    params,
  )
}

export function allBy<T>(params: AllByParams<T>) {
  return new DataLoader<Key, T[], CacheKey>(async (keys: readonly Key[]) => {
    const rows = await findRows(params, keys)

    const rowsHash: Record<CacheKey, T[]> = reduce(
      rows,
      (acc: Record<CacheKey, T[]>, item: T) => {
        const field = get(item, params.field)
        const cacheKey: CacheKey = params.cacheKeyFn
          ? params.cacheKeyFn(field)
          : field
        if (!acc[cacheKey]) acc[cacheKey] = []
        acc[cacheKey].push(item)
        return acc
      },
      {},
    )

    return keys.map((key: Key) =>
      params.transform
        ? params.transform(
            rowsHash?.[params.cacheKeyFn ? params.cacheKeyFn(key) : key],
          )
        : rowsHash?.[params.cacheKeyFn ? params.cacheKeyFn(key) : key],
    )
  }, params)
}

export function complexAllBy<T>(params: ComplexAllByParams<T>) {
  return new DataLoader<ComplexKey, T[], CacheKey>(
    async (keys: readonly ComplexKey[]) => {
      const rows = await findComplexRows(params, keys)

      const cacheKeys: CacheKey[] = keys.map(params.cacheKeyFn)

      const rowsHash: Record<CacheKey, T[]> = reduce(
        rows,
        (acc: Record<CacheKey, T[]>, item: T) => {
          const cacheKey: CacheKey = params.cacheKeyFn(item as any)
          if (!acc[cacheKey]) acc[cacheKey] = []
          acc[cacheKey].push(item)
          return acc
        },
        {},
      )

      return cacheKeys.map((key: CacheKey) => rowsHash?.[key])
    },
    params,
  )
}

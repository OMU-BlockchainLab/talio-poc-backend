import fs from 'fs'
import { DateTime } from 'luxon'
import path from 'path'
import { QueryTypes } from 'sequelize'

import { difference } from 'lodash'

import db from '../Db'

export const SEED_TABLE = '_sequelize_data'
export const SEEDER_DIR = path.join(
  __dirname,
  '..',
  '..',
  '..',
  'db/ts-seeders',
)

const TEMPLATE_DIR = path.join(__dirname, './template')

function isSeedFile(filename: string): boolean {
  const index = filename.length - 3
  return filename.indexOf('.ts') === index || filename.indexOf('.js') === index
}

export const getSeedNameFromFileName = (filename: string): string => {
  const fln = path.basename(filename)
  const endIndex =
    filename.indexOf('.ts') !== -1 ? fln.indexOf('.ts') : fln.indexOf('.js')
  return fln.substr(0, endIndex)
}

export const getAllSeedFiles = async (): Promise<string[]> => {
  const rs: string[] = []
  fs.readdirSync(SEEDER_DIR).forEach(f => {
    if (isSeedFile(f)) {
      rs.push(f)
    }
  })
  return rs
}

export const getSeedFilesAvailable = async () => {
  const filesName = await getAllSeedFiles()
  return filesName
    .map(n => path.resolve(SEEDER_DIR, n))
    .sort((a, b) => a.localeCompare(b))
}

function getSeedDatetime(): string {
  return DateTime.fromISO(new Date().toISOString()).toFormat('yyyyMMddhhmmss')
}

export const getNewSeedFileName = (name: string, ext = 'ts'): string =>
  `${getSeedDatetime()}-${name
    .toLowerCase()
    .split(' ')
    .filter(s => s)
    .join('-')}.${ext}`

export const getTemplateFilepath = () =>
  path.resolve(TEMPLATE_DIR, 'template.ts')

export const getAvalableSeedFiles = (
  seedFilesName: string[],
  dbFilesName: string[],
) => difference(seedFilesName, dbFilesName)

export const getAllSeededFromDB = () =>
  new Promise<any[]>((resolve, reject) => {
    db.query(`SELECT * FROM ${SEED_TABLE}`, {
      raw: true,
      nest: true,
    })
      .then(rows => resolve(rows))
      .catch(e => resolve([]))
  })

export const insertNewSeededToDB = (name: string) =>
  new Promise<boolean>((resolve, reject) => {
    db.query(
      `insert into ${SEED_TABLE}(name, created_at) values (:name, :created_at)`,
      {
        replacements: { name, created_at: new Date() },
        type: QueryTypes.INSERT,
      },
    )
      .then(rows => {
        console.log(rows)
        return resolve(true)
      })
      .catch(e => {
        console.log(e)
        return resolve(false)
      })
  })

export const createSeedTable = async (): Promise<void> => {
  await db.query(
    `CREATE TABLE IF NOT EXISTS ${SEED_TABLE} (
        id uuid NOT NULL DEFAULT uuid_generate_v4(),
        name text NOT NULL,
        created_at date,
        PRIMARY KEY  (id)
      )`,
    {
      type: QueryTypes.RAW,
    },
  )
}

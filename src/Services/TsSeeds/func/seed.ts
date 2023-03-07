/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-restricted-syntax */
/* eslint-disable global-require */
/* eslint-disable no-continue */
import path from 'path'

import {
  createSeedTable,
  getAllSeededFromDB,
  getAllSeedFiles,
  getAvalableSeedFiles,
  insertNewSeededToDB,
  SEEDER_DIR,
} from '../utils'

export const seed = async (argv: any) => {
  try {
    await createSeedTable()
    const files = await getAllSeedFiles()
    const filesFromDB = await getAllSeededFromDB()

    const currentSeedFiles = getAvalableSeedFiles(
      files,
      filesFromDB.map(m => m.name),
    )
    if (!currentSeedFiles.length) {
      console.log('No ts seed files found')
      process.exit(1)
    }
    for await (const filename of currentSeedFiles) {
      try {
        const filepath = path.resolve(SEEDER_DIR, filename)
        const run = require(filepath).default
        await run()
        await insertNewSeededToDB(filename)
        console.log(`Seed completed ${filename}`)
      } catch (error) {
        console.log(`Error ts seed file ${filename} ${error}`)
        continue
      }
    }
    process.exit(1)
  } catch (error) {
    console.log(`error ts seed file: ${error}`)
    process.exit(1)
  }
}

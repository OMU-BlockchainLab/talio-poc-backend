import fs from 'fs'
import path from 'path'

import { getNewSeedFileName, getTemplateFilepath, SEEDER_DIR } from '../utils'

export const create = async (argv: any) => {
  const { name } = argv
  if (!name) {
    console.log('you should pass seeder name (--name=add-role-example-name)')
    process.exit(1)
  }

  try {
    if (!fs.existsSync(SEEDER_DIR)) {
      fs.mkdirSync(SEEDER_DIR)
    }
    const filename = getNewSeedFileName(name, 'ts')
    const filepath = path.resolve(SEEDER_DIR, filename)
    fs.copyFileSync(getTemplateFilepath(), filepath)
    console.log(`New ts seed was created at ${filepath}`)
    process.exit(1)
  } catch (error) {
    console.log(`error creating ts seed file: ${error}`)
    process.exit(1)
  }
}

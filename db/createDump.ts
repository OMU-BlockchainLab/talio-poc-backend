import '@startupcraft/dotenv-config'

import { spawn } from 'child_process'
import fs from 'fs'
import path from 'path'

import { DATABASE, IS_PRODUCTION } from 'Config'

if (IS_PRODUCTION) process.exit(0)

const filepath = path.resolve(__dirname, 'schema.sql')

const pgDumpChild = spawn('pg_dump', [DATABASE.URL, '-s', '--no-owner'], {
  stdio: ['ignore', 'pipe'],
})

pgDumpChild.on('exit', code => {
  if (code !== 0) {
    throw new Error(`pg_dump: Bad exit code (${code})`)
  }
})

const writeStream = fs.createWriteStream(filepath)

if (pgDumpChild.stdout) {
  pgDumpChild.stdout.pipe(writeStream)
}

writeStream.on('finish', () => {
  // eslint-disable-next-line no-console
  console.log(`Schema successfully written`)
})

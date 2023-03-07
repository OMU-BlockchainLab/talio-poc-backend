/* eslint-disable no-console */
import '@startupcraft/dotenv-config'

async function main() {
  try {
    console.log('test')

    process.exit(0)
  } catch (error) {
    console.log({ error })
    process.exit(-1)
  }
}

main()

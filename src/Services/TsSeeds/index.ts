import '@startupcraft/dotenv-config'

import { argv } from 'yargs'

import { create } from './func/create'
import { seed } from './func/seed'

const main = () => {
  const { action }: any = argv
  switch (action) {
    case 'create':
      return create(argv)
    case 'seed':
      return seed(argv)

    default:
      break
  }

  process.exit(0)

  return true
}

main()

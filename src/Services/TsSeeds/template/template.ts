/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
import { Role } from 'Models'

require('tsconfig-paths/register')

const run = () => {
  Role.findOne({})
  console.log('Seeded')
}

export default run

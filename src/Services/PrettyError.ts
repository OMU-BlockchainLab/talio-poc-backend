import PrettyError from 'pretty-error'

import { IS_DEVELOPMENT, IS_TEST } from 'Config'

const isPretty = IS_DEVELOPMENT || IS_TEST

const pe = new PrettyError()
pe.skipNodeFiles()
pe.skipPackage(
  'apollo-server-core',
  'apollo-server-koa',
  'aws-sdk',
  'bluebird',
  'express',
  'graphql',
  'jsonwebtoken',
  'lodash',
  'retry-as-promised',
  'sequelize',
  'sequelize-typescript',
  'tslib',
  'type-graphql',
  'ws',
)

pe.skip(((traceLine: any) => !traceLine.file) as any) // eslint-disable-line @typescript-eslint/no-explicit-any

if (!isPretty) {
  pe.withoutColors()
  pe.appendStyle({
    'pretty-error > trace': {
      marginTop: 0,
    },
    'pretty-error > trace > item': {
      marginBottom: 0,
    },
  })
}

export default pe.render.bind(pe)

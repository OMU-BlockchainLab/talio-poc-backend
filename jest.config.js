require('@startupcraft/dotenv-config')
const { defaults: tsjPreset } = require('ts-jest/presets')
const { defaults } = require('jest-config')

module.exports = {
  ...defaults,
  roots: ['<rootDir>/src'],
  modulePaths: ['<rootDir>/src'],
  testMatch: ['<rootDir>/src/__tests__/**/?(*.)+(spec|test).ts'],
  transform: {
    ...tsjPreset.transform,
  },
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setupTests.ts'],
  globals: {
    'ts-jest': {
      isolatedModules: true,
      tsconfig: 'tsconfig.json',
    },
  },
}

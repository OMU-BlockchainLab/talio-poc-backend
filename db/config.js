require('@startupcraft/dotenv-config')

const params = {
  use_env_variable: 'DATABASE_URL',
  dialect: 'postgres',
  migrationStorageTableName: '_sequelize_meta',
  seederStorage: 'sequelize',
  seederStorageTableName: '_sequelize_data',
}

module.exports = {
  production: {
    ...params,
  },
  test: {
    ...params,
  },
  development: {
    ...params,
  },
}

module.exports = {
  up: async queryInterface =>
    queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.sequelize.query(
        `
          CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
          CREATE EXTENSION IF NOT EXISTS "citext";
          CREATE EXTENSION IF NOT EXISTS "pg_trgm";
        `,
        { transaction },
      )
    }),
  down: async queryInterface =>
    queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.sequelize.query(
        `
          DROP EXTENSION IF EXISTS "uuid-ossp";
          DROP EXTENSION IF EXISTS "citext";
          DROP EXTENSION IF EXISTS "pg_trgm";
        `,
        { transaction },
      )
    }),
}

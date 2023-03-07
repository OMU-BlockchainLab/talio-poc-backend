const baseTypes = require('../baseTypes')

const tableName = 'login_credentials'

module.exports = {
  up: (queryInterface, Sequelize) => {
    const types = baseTypes(Sequelize)

    return queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.createTable(
        tableName,
        {
          user_id: types.reference('users', 'id', { primaryKey: true }),

          login: { type: Sequelize.STRING, allowNull: false },
          password_digest: { type: Sequelize.STRING, allowNull: false },

          ...types.timestamps,
        },
        { transaction },
      )

      // Only 1 active login credential
      await queryInterface.addIndex(tableName, {
        fields: ['user_id'],
        unique: true,
        where: { deleted_at: { [Sequelize.Op.is]: null } },
        transaction,
      })

      // Only 1 username
      await queryInterface.addIndex(tableName, {
        fields: ['login'],
        unique: true,
        where: { deleted_at: { [Sequelize.Op.is]: null } },
        transaction,
      })
    })
  },

  down: queryInterface =>
    queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.dropTable(tableName, { transaction })
    }),
}

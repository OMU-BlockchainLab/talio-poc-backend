const baseTypes = require('../baseTypes')

module.exports = {
  up: (queryInterface, Sequelize) => {
    const types = baseTypes(Sequelize)

    return queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.createTable(
        'auth_tokens',
        {
          id: types.id,
          user_id: types.reference('users', 'id'),

          access_key: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
          },
          access_expires_at: {
            type: Sequelize.DATE,
            allowNull: false,
          },

          refresh_key: {
            type: Sequelize.STRING,
            unique: true,
          },
          refresh_expires_at: {
            type: Sequelize.DATE,
          },

          origin: Sequelize.JSONB,
        },
        { transaction },
      )
    })
  },

  down: queryInterface =>
    queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.dropTable('auth_tokens', { transaction })
    }),
}

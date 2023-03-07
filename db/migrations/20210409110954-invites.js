const baseTypes = require('../baseTypes')

const tableName = 'invites'

module.exports = {
  up: (queryInterface, Sequelize) => {
    const types = baseTypes(Sequelize)

    return queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.createTable(
        tableName,
        {
          id: types.id,

          creator_id: types.reference('users', 'id'),
          invited_user_id: types.reference('users', 'id', { allowNull: true }),
          invited_phone: Sequelize.STRING,

          invite_token: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
          },

          accepted_at: Sequelize.DATE,

          ...types.timestamps,
        },
        { transaction },
      )

      await queryInterface.addIndex(tableName, {
        fields: ['invited_user_id', 'creator_id'],
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

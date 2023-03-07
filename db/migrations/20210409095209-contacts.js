const baseTypes = require('../baseTypes')

const tableName = 'contacts'

module.exports = {
  up: (queryInterface, Sequelize) => {
    const types = baseTypes(Sequelize)

    return queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.createTable(
        tableName,
        {
          id: types.id,

          creator_id: types.reference('users', 'id'),
          user_id: types.reference('users', 'id'),

          phone: Sequelize.STRING,

          blocked_at: Sequelize.DATE,

          ...types.timestamps,
        },
        { transaction },
      )

      await queryInterface.addIndex(tableName, {
        fields: ['user_id', 'creator_id'],
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

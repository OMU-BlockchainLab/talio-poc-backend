const baseTypes = require('../baseTypes')

const tableName = 'wallets'

module.exports = {
  up: (queryInterface, Sequelize) => {
    const types = baseTypes(Sequelize)

    return queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.createTable(
        tableName,
        {
          id: types.id,
          user_id: types.reference('users', 'id'),
          address: { type: Sequelize.STRING, allowNull: false },
          coin: { type: Sequelize.STRING, allowNull: false },
          tw_id: Sequelize.UUID,

          ...types.timestamps,
        },
        { transaction },
      )

      await queryInterface.addIndex(tableName, {
        fields: ['user_id', 'address', 'coin'],
        unique: true,
        where: { deleted_at: { [Sequelize.Op.is]: null } },
        transaction,
      })

      await queryInterface.removeColumn('users', 'wallet_address', {
        transaction,
      })
    })
  },

  down: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.dropTable(tableName, { transaction })

      await queryInterface.addColumn(
        'users',
        'wallet_address',
        { type: Sequelize.STRING },
        { transaction },
      )
    }),
}

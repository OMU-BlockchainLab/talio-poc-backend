const baseTypes = require('../baseTypes')

module.exports = {
  up: (queryInterface, Sequelize) => {
    const types = baseTypes(Sequelize)

    return queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.createTable(
        'requests',
        {
          id: types.id,

          from_user_id: types.reference('users', 'id'),
          from_address: Sequelize.STRING,
          to_user_id: types.reference('users', 'id'),
          to_address: Sequelize.STRING,

          coin: { type: Sequelize.STRING, allowNull: false },
          amount: { type: Sequelize.STRING, allowNull: false },

          state: {
            type: Sequelize.ENUM,
            values: ['pending', 'accepted', 'declined'],
            defaultValue: 'pending',
            allowNull: false,
          },

          ...types.timestamps,
        },
        { transaction },
      )
    })
  },

  down: queryInterface =>
    queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.dropTable('requests', { transaction })

      await queryInterface.sequelize.query('drop type enum_requests_state', {
        transaction,
      })
    }),
}

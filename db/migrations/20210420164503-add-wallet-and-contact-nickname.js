module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.addColumn(
        'users',
        'wallet_address',
        { type: Sequelize.STRING },
        { transaction },
      )

      await queryInterface.addColumn(
        'contacts',
        'nickname',
        { type: Sequelize.STRING },
        { transaction },
      )
    }),

  down: queryInterface =>
    queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.removeColumn('users', 'wallet_address', {
        transaction,
      })

      await queryInterface.removeColumn('contacts', 'nickname', {
        transaction,
      })
    }),
}

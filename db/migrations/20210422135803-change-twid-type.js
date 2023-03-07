const tableName = 'wallets'

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.changeColumn(tableName, 'tw_id', Sequelize.STRING, {
        transaction,
      })
    }),

  down: async () => {},
}

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.addColumn(
        'login_credentials',
        'memo_digest',
        Sequelize.STRING,
        { transaction },
      )
    }),

  down: queryInterface =>
    queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.removeColumn('login_credentials', 'memo_digest', {
        transaction,
      })
    }),
}

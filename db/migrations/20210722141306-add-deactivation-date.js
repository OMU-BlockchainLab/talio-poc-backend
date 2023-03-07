module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.addColumn(
        'users',
        'deactivation_at',
        Sequelize.DATE,
        { transaction },
      )
    }),

  down: queryInterface =>
    queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.removeColumn('users', 'deactivation_at', {
        transaction,
      })
    }),
}

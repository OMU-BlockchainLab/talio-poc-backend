module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.addColumn(
        'user_profiles',
        'background_url',
        Sequelize.STRING,
        { transaction },
      )
    }),

  down: queryInterface =>
    queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.removeColumn('user_profiles', 'background_url', {
        transaction,
      })
    }),
}

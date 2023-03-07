module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.addColumn(
        'users',
        'group_only_contacts',
        { type: Sequelize.BOOLEAN, defaultValue: false, allowNull: false },
        { transaction },
      )
    }),

  down: queryInterface =>
    queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.removeColumn('users', 'group_only_contacts', {
        transaction,
      })
    }),
}

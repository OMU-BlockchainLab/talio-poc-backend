module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.removeColumn('roles', 'weight', { transaction })
    }),
  down: async (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.addColumn(
        'roles',
        'weight',
        {
          type: Sequelize.INTEGER,
          defaultValue: 0,
          allowNull: true,
        },

        { transaction },
      )
    }),
}

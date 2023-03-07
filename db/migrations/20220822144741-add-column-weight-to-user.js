/* eslint-disable no-return-await */
module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.addColumn(
        'users',
        'weight',
        {
          type: Sequelize.INTEGER,
          allowNull: true,
          default: 0,
        },

        { transaction },
      )
    }),

  down: async (queryInterface, Sequelize) =>
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('users', 'weight'),
}

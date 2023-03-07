/* eslint-disable no-return-await */
module.exports = {
  up: async (queryInterface, Sequelize) =>
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
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
  down: async (queryInterface, Sequelize) =>
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('roles', 'weight'),
}

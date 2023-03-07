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
        'users',
        'type',
        {
          type: Sequelize.STRING,
          default: 'user',
          allowNull: true,
        },

        { transaction },
      )
    }),

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('users', 'type')
  },
}

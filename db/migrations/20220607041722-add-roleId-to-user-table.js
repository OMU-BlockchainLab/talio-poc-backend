const baseTypes = require('../baseTypes')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const types = baseTypes(Sequelize)
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn(
      'users',
      'role_id',
      types.reference('roles', 'id', { allowNull: true }),
    )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('users', 'role_id')
  },
}

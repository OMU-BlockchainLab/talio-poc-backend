/* eslint-disable no-unused-expressions */
const baseTypes = require('../baseTypes')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const types = baseTypes(Sequelize)
    const { DataTypes } = Sequelize

    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.createTable(
        'permissions',
        {
          id: types.id,
          name: { type: DataTypes.STRING, allowNull: false },
          code: { type: DataTypes.STRING, allowNull: false },
          status: { type: DataTypes.STRING, allowNull: false },
          ...types.timestamps,
        },
        { transaction },
      )
      await queryInterface.createTable(
        'roles',
        {
          id: types.id,
          name: { type: DataTypes.STRING, allowNull: false },
          code: { type: DataTypes.STRING, allowNull: false },
          status: { type: DataTypes.STRING, allowNull: false },
          created_by_id: types.reference('users', 'id', { allowNull: true }),
          updated_by_id: types.reference('users', 'id', { allowNull: true }),
          ...types.timestamps,
        },
        { transaction },
      )
      await queryInterface.createTable(
        'roles_permissions',
        {
          id: types.id,
          role_id: types.reference('roles', 'id'),
          permission_id: types.reference('permissions', 'id'),
          created_by_id: types.reference('users', 'id', { allowNull: true }),
          updated_by_id: types.reference('users', 'id', { allowNull: true }),
          ...types.timestamps,
        },
        { transaction },
      )
    })
  },

  down: async (queryInterface, Sequelize) =>
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.dropTable('roles_permissions', { transaction })
      await queryInterface.dropTable('roles', { transaction })
      await queryInterface.dropTable('permissions', { transaction })
    }),
}

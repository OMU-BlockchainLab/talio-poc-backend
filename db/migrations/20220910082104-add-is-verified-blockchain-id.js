module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.addColumn(
        'Certificates',
        'is_verified',
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          default: false,
        },

        { transaction },
      )
      await queryInterface.addColumn(
        'Certificates',
        'blockchain_id',
        {
          type: Sequelize.INTEGER,
          allowNull: true,
        },

        { transaction },
      )
    }),

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Certificates', 'is_verified')
    await queryInterface.removeColumn('Certificates', 'blockchain_id')
  },
}

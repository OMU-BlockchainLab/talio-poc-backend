module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.changeColumn(
        'Certificates',
        'blockchain_id',
        {
          type: Sequelize.STRING,
          allowNull: true,
          default: false,
        },

        { transaction },
      )
    }),

  down: async (queryInterface, Sequelize) => {},
}

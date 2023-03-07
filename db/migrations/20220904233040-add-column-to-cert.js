module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.addColumn(
        'Certificates',
        'name',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },

        { transaction },
      )
      await queryInterface.addColumn(
        'Certificates',
        'date_of_issued',
        {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },

        { transaction },
      )
    }),
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Certificates', 'name')
    await queryInterface.removeColumn('Certificates', 'date_of_issued')
  },
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.addColumn(
        'CVs',
        'min_expected_salary',
        {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        { transaction },
      )
      await queryInterface.addColumn(
        'CVs',
        'max_expected_salary',
        {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        { transaction },
      )
      await queryInterface.addColumn(
        'CVs',
        'number_of_years_experience',
        {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        { transaction },
      )
      await queryInterface.addColumn(
        'CVs',
        'skills',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
        { transaction },
      )
      await queryInterface.addColumn(
        'CVs',
        'tags',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
        { transaction },
      )
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('CVs', 'minExpectedSalary')
    await queryInterface.removeColumn('CVs', 'minExpectedSalary')
    await queryInterface.removeColumn('CVs', 'minExpectedSalary')
    await queryInterface.removeColumn('CVs', 'minExpectedSalary')
    await queryInterface.removeColumn('CVs', 'number_of_years_experience')
  },
}

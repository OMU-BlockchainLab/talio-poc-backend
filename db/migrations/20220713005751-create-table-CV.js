const baseTypes = require('../baseTypes')

module.exports = {
  up: (queryInterface, Sequelize) => {
    const types = baseTypes(Sequelize)

    return queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.createTable(
        'CVs',
        {
          id: types.id,
          objective: Sequelize.STRING,
          cv_url: Sequelize.STRING,

          job_position: {
            type: Sequelize.ENUM,
            values: ['frontend dev', 'backend dev', 'fullstack dev', 'devops'],
          },

          industry_category: {
            type: Sequelize.ENUM,
            values: ['finance', 'economic', 'hotel', 'travel', 'logistic'],
          },

          created_by: types.reference('users', 'id'),

          ...types.timestamps,
        },
        { transaction },
      )
    })
  },

  down: queryInterface =>
    queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.dropTable('CVs', {
        transaction,
      })
    }),
}

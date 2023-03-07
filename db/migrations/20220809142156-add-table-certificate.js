const baseTypes = require('../baseTypes')

module.exports = {
  up: (queryInterface, Sequelize) => {
    const types = baseTypes(Sequelize)

    return queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.createTable(
        'Certificates',
        {
          id: types.id,
          cv_id: types.reference('CVs', 'id', { allowNull: true }),
          user_id: types.reference('users', 'id', { allowNull: true }),

          issuer: Sequelize.STRING,
          cert_url: Sequelize.STRING,
          type: Sequelize.STRING,
          origirinal_date: Sequelize.DATE,
          expiration_date: Sequelize.DATE,
          meta_data: Sequelize.JSON,
          is_pubic: Sequelize.BOOLEAN,

          ...types.timestamps,
        },
        { transaction },
      )
    })
  },

  down: queryInterface =>
    queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.dropTable('Certificates', {
        transaction,
      })
    }),
}

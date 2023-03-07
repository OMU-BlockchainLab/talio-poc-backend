module.exports = {
  up: queryInterface =>
    queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.addIndex(
        'user_profiles',
        {
          fields: ['nickname'],
          name: 'trgm_idx_user_profiles_nickname',
          using: 'gin',
          operator: 'gin_trgm_ops',
        },
        { transaction },
      )
    }),

  down: queryInterface =>
    queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.sequelize.query(
        'drop index trgm_idx_user_profiles_nickname',
        {
          transaction,
        },
      )
    }),
}

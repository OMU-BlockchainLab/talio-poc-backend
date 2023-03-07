const baseTypes = require('../baseTypes')

module.exports = {
  up: (queryInterface, Sequelize) => {
    const types = baseTypes(Sequelize)

    return queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.createTable(
        'users',
        {
          id: types.id,

          state: {
            type: Sequelize.ENUM,
            values: ['active', 'deactivated'],
            allowNull: false,
            defaultValue: 'active',
          },

          role: {
            type: Sequelize.ENUM,
            values: ['superAdmin', 'admin', 'user'],
            defaultValue: 'user',
          },

          onboarding_steps: Sequelize.JSONB,
          onboarding_completed_at: Sequelize.DATE,

          deactivated_at: Sequelize.DATE,
          last_login_at: Sequelize.DATE,

          is_two_factor_auth_enabled: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          },

          ...types.timestamps,
        },
        { transaction },
      )

      /** User Profiles */
      await queryInterface.createTable(
        'user_profiles',
        {
          user_id: types.reference('users', 'id', { primaryKey: true }),

          nickname: Sequelize.STRING,
          status_message: Sequelize.STRING(256),

          photo_url: Sequelize.STRING,

          ...types.timestamps,
        },
        { transaction },
      )
    })
  },

  down: queryInterface =>
    queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.dropTable('user_profiles', { transaction })
      await queryInterface.dropTable('users', { transaction })

      await queryInterface.sequelize.query('drop type enum_users_role', {
        transaction,
      })
      await queryInterface.sequelize.query('drop type enum_users_state', {
        transaction,
      })
    }),
}

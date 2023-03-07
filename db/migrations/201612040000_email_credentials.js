const baseTypes = require('../baseTypes')

module.exports = {
  up: (queryInterface, Sequelize) => {
    const types = baseTypes(Sequelize)

    return queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.createTable(
        'email_credentials',
        {
          id: types.id,
          user_id: types.reference('users', 'id'),

          state: {
            type: Sequelize.ENUM,
            values: ['pending', 'active', 'deactivated'],
            defaultValue: 'pending',
            allowNull: false,
          },

          email: {
            type: 'citext',
            allowNull: false,
          },

          password_digest: Sequelize.STRING,

          confirmed_at: Sequelize.DATE,
          deactivated_at: Sequelize.DATE,

          is_primary: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          },

          ...types.timestamps,
        },
        { transaction },
      )

      // Only 1 active email credential
      await queryInterface.addIndex('email_credentials', {
        fields: ['email'],
        unique: true,
        where: { state: 'active', deleted_at: { [Sequelize.Op.is]: null } },
        transaction,
      })

      // Only 1 email per user
      await queryInterface.addIndex('email_credentials', {
        fields: ['user_id', 'email'],
        unique: true,
        where: { deleted_at: { [Sequelize.Op.is]: null } },
        transaction,
      })

      // Only 1 primary per user
      await queryInterface.addIndex('email_credentials', {
        fields: ['user_id'],
        unique: true,
        where: { is_primary: true, deleted_at: { [Sequelize.Op.is]: null } },
        transaction,
      })

      await queryInterface.createTable(
        'email_confirmation_requests',
        {
          id: types.id,
          email_credential_id: types.reference('email_credentials'),

          state: {
            type: Sequelize.ENUM,
            values: ['pending', 'processed'],
            defaultValue: 'pending',
            allowNull: false,
          },

          token: {
            type: Sequelize.STRING,
            allowNull: false,
          },

          expires_at: {
            type: Sequelize.DATE,
            allowNull: false,
          },

          processed_at: Sequelize.DATE,

          ...types.timestamps,
        },
        { transaction },
      )

      await queryInterface.createTable(
        'change_email_password_requests',
        {
          id: types.id,
          email_credential_id: types.reference('email_credentials'),

          state: {
            type: Sequelize.ENUM,
            values: ['pending', 'processed'],
            defaultValue: 'pending',
            allowNull: false,
          },

          token: {
            type: Sequelize.STRING,
            allowNull: false,
          },

          expires_at: {
            type: Sequelize.DATE,
            allowNull: false,
          },

          processed_at: Sequelize.DATE,

          ...types.timestamps,
        },
        { transaction },
      )
    })
  },

  down: queryInterface =>
    queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.dropTable('change_email_password_requests', {
        transaction,
      })

      await queryInterface.dropTable('email_confirmation_requests', {
        transaction,
      })

      await queryInterface.dropTable('email_credentials', { transaction })

      await queryInterface.sequelize.query(
        'drop type enum_email_confirmation_requests_state',
        { transaction },
      )

      await queryInterface.sequelize.query(
        'drop type enum_email_credentials_state',
        { transaction },
      )

      await queryInterface.sequelize.query(
        'drop type enum_change_email_password_requests_state',
        { transaction },
      )
    }),
}

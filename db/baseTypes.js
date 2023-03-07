module.exports = DataTypes => ({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.fn('uuid_generate_v4'),
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  reference: (
    table,
    key = 'id',
    { allowNull = false, primaryKey = false } = {},
  ) => ({
    type: DataTypes.UUID,
    allowNull,
    primaryKey,

    references: {
      model: table,
      key,
    },
    onUpdate: 'cascade',
    onDelete: 'cascade',
  }),
  timestamps: {
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
    },
    deleted_at: DataTypes.DATE,
  },
})

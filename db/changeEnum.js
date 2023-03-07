module.exports = async function changeEnum(params) {
  const {
    tableName,
    columnName,
    defaultValue,
    newValues,
    queryInterface,
    transaction,
  } = params
  const enumName = params.enumName || `enum_${tableName}_${columnName}`
  const oldEnumName = `${enumName}_old`

  await queryInterface.sequelize.query(
    `alter type ${enumName} rename to ${oldEnumName}`,
    { transaction },
  )

  await queryInterface.sequelize.query(
    `create type ${enumName} as enum ('${newValues.join("', '")}')`,
    { transaction },
  )

  if (defaultValue !== undefined) {
    await queryInterface.sequelize.query(
      `alter table ${tableName} alter column ${columnName} drop default`,
      { transaction },
    )
  }

  await queryInterface.sequelize.query(
    `alter table ${tableName} alter column ${columnName} type public.${enumName} using ${columnName}::text::public.${enumName}`,
    { transaction },
  )

  if (defaultValue !== undefined) {
    await queryInterface.sequelize.query(
      `alter table ${tableName} alter column ${columnName} set default '${defaultValue}'::${enumName}`,
      { transaction },
    )
  }

  await queryInterface.sequelize.query(`drop type ${oldEnumName}`, {
    transaction,
  })
}

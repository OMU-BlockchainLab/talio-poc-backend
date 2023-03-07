import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'

import User from './User'

const tableName = 'auth_tokens'

interface Origin {
  'user-agent': string
  host: string
  referer: string
}

@Table({
  timestamps: false,
  paranoid: true,
  underscored: true,
  tableName,
})
export default class AuthToken extends Model {
  public static tableName = tableName

  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  public id: string

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  public userId: string

  @Column(DataType.TEXT)
  public accessKey: string

  @Column(DataType.DATE)
  public accessExpiresAt: Date

  @Column(DataType.TEXT)
  public refreshKey?: string

  @Column(DataType.DATE)
  public refreshExpiresAt?: Date

  @Column(DataType.JSONB)
  public origin?: Origin

  @BelongsTo(() => User)
  public user: User
}

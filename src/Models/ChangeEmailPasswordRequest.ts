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

import EmailCredential from './EmailCredential'

export enum ChangeEmailPasswordRequestState {
  pending = 'pending',
  processed = 'processed',
}

const tableName = 'change_email_password_requests'

@Table({
  timestamps: true,
  paranoid: true,
  underscored: true,
  tableName,
})
export default class ChangeEmailPasswordRequest extends Model {
  public static tableName = tableName

  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  public id: string

  @ForeignKey(() => EmailCredential)
  @Column(DataType.UUID)
  public emailCredentialId: string

  @Default(ChangeEmailPasswordRequestState.pending)
  @Column({
    type: DataType.ENUM,
    values: Object.values(ChangeEmailPasswordRequestState),
  })
  public state: string

  @Column(DataType.STRING)
  public token: string

  @Column(DataType.DATE)
  public expiresAt: Date

  @Column(DataType.DATE)
  public processedAt: Date

  @Column(DataType.DATE)
  public createdAt: Date

  @Column(DataType.DATE)
  public updatedAt: Date

  @Column(DataType.DATE)
  public deletedAt?: Date

  @BelongsTo(() => EmailCredential)
  public emailCredential: EmailCredential
}

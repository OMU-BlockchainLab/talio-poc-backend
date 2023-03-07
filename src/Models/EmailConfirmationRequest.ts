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

export enum EmailConfirmationRequestState {
  pending = 'pending',
  processed = 'processed',
}

const tableName = 'email_confirmation_requests'

@Table({
  timestamps: true,
  paranoid: true,
  underscored: true,
  tableName,
})
export default class EmailConfirmationRequest extends Model {
  public static tableName = tableName

  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  public id: string

  @ForeignKey(() => EmailCredential)
  @Column({ type: DataType.UUID })
  public emailCredentialId: string

  @Default(EmailConfirmationRequestState.pending)
  @Column({
    type: DataType.ENUM,
    values: Object.values(EmailConfirmationRequestState),
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

  @BelongsTo((): typeof EmailCredential => EmailCredential)
  public emailCredential: EmailCredential
}

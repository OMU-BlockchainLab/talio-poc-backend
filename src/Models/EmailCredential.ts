import {
  BelongsTo,
  Column,
  DataType,
  Default,
  DefaultScope,
  ForeignKey,
  Model,
  PrimaryKey,
  Scopes,
  Table,
} from 'sequelize-typescript'
import { Field, ID, ObjectType } from 'type-graphql'

import User from './User'

const tableName = 'email_credentials'

export enum EmailCredentialState {
  pending = 'pending',
  active = 'active',
  deactivated = 'deactivated',
}

@Scopes(() => ({
  withPassword: {
    attributes: { include: ['passwordDigest'] },
  },
}))
@DefaultScope(() => ({
  attributes: {
    exclude: ['passwordDigest'],
  },
}))
@Table({
  timestamps: true,
  paranoid: true,
  underscored: true,
  tableName,
})
@ObjectType('EmailCredential')
export default class EmailCredential extends Model {
  public static tableName = tableName

  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  @Field(() => ID)
  public id: string

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  public userId: string

  @Default(EmailCredentialState.pending)
  @Column({ type: DataType.ENUM, values: Object.values(EmailCredentialState) })
  @Field(() => EmailCredentialState)
  public state: string

  @Column(DataType.STRING)
  @Field()
  public email: string

  @Column(DataType.STRING)
  public passwordDigest?: string

  @Column(DataType.DATE)
  @Field({ nullable: true })
  public confirmedAt: Date

  @Column(DataType.DATE)
  @Field({ nullable: true })
  public deactivatedAt: Date

  @Column(DataType.BOOLEAN)
  @Field()
  public isPrimary: boolean

  @Column(DataType.DATE)
  @Field()
  public createdAt: Date

  @Column(DataType.DATE)
  @Field()
  public updatedAt: Date

  @Column(DataType.DATE)
  public deletedAt?: Date

  @BelongsTo(() => User)
  public user: User
}

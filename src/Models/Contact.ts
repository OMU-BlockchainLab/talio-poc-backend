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
import { Field, ID, ObjectType } from 'type-graphql'

import User from './User'

const tableName = 'contacts'

@Table({
  timestamps: true,
  paranoid: true,
  underscored: true,
  tableName,
})
@ObjectType('Contact')
export default class Contact extends Model {
  public static tableName = tableName

  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  @Field(() => ID)
  public id: string

  @Column(DataType.UUID)
  @ForeignKey(() => User)
  @Field(() => ID)
  public creatorId: string

  @Column(DataType.UUID)
  @ForeignKey(() => User)
  @Field(() => ID)
  public userId: string

  @Column(DataType.STRING)
  @Field({ nullable: true })
  public nickname?: string

  @Column(DataType.STRING)
  @Field({ nullable: true })
  public phone?: string

  @Column(DataType.DATE)
  @Field({ nullable: true })
  public blockedAt?: Date

  @Column(DataType.TEXT)
  @Field({ nullable: true })
  public blockReason?: string

  @Column(DataType.DATE)
  @Field()
  public createdAt: Date

  @Column(DataType.DATE)
  @Field()
  public updatedAt: Date

  @Column(DataType.DATE)
  public deletedAt?: Date

  @BelongsTo(() => User, 'userId')
  public user: User

  @BelongsTo(() => User, 'creatorId')
  public creator: User
}

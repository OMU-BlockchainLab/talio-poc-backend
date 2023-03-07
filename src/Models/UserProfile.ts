import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'
import { Field, ID, ObjectType } from 'type-graphql'

import User from './User'

const tableName = 'user_profiles'

@Table({
  timestamps: true,
  paranoid: true,
  underscored: true,
  tableName,
})
@ObjectType('UserProfile')
export default class UserProfile extends Model {
  public static tableName = tableName

  @PrimaryKey
  @Column(DataType.UUID)
  @ForeignKey(() => User)
  @Field(() => ID)
  public userId: string

  @Column(DataType.STRING)
  @Field({ nullable: true })
  public nickname?: string

  @Column(DataType.STRING)
  @Field({ nullable: true })
  public statusMessage?: string

  @Column(DataType.STRING)
  @Field({ nullable: true })
  public photoUrl?: string

  @Column(DataType.STRING)
  @Field({ nullable: true })
  public backgroundUrl?: string

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

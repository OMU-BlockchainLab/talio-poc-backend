import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'
import { Field, ID, ObjectType } from 'type-graphql'

import User from './User'

const tableName = 'invites'

@Table({
  timestamps: true,
  paranoid: true,
  underscored: true,
  tableName,
})
@ObjectType('Invite')
export default class Invite extends Model {
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
  @Field(() => ID, { nullable: true })
  public invitedUserId?: string

  @Column(DataType.STRING)
  @Field({ nullable: true })
  public invitedPhone?: string

  @Column(DataType.STRING)
  @Field()
  public inviteToken: string

  @Column(DataType.DATE)
  public acceptedAt?: Date

  @Column(DataType.DATE)
  @Field()
  public createdAt: Date

  @Column(DataType.DATE)
  @Field()
  public updatedAt: Date

  @Column(DataType.DATE)
  public deletedAt?: Date

  @BelongsTo(() => User, 'invitedUserId')
  public invitedUser?: User

  @BelongsTo(() => User, 'creatorId')
  public creator: User
}

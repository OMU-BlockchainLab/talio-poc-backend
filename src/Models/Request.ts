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

import { Coin } from 'Constants/enums'

import User from './User'

export enum RequestState {
  pending = 'pending',
  accepted = 'accepted',
  declined = 'declined',
}

const tableName = 'requests'

@Table({
  timestamps: true,
  paranoid: true,
  underscored: true,
  tableName,
})
@ObjectType('Request')
export default class Request extends Model {
  public static tableName = tableName

  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  @Field(() => ID)
  public id: string

  @Column(DataType.UUID)
  @ForeignKey(() => User)
  @Field(() => ID)
  public fromUserId: string

  @Column(DataType.STRING)
  @Field(() => String, { nullable: true })
  public fromAddress?: string

  @Column(DataType.UUID)
  @ForeignKey(() => User)
  @Field(() => ID)
  public toUserId: string

  @Column(DataType.STRING)
  @Field(() => String, { nullable: true })
  public toAddress?: string

  @Column(DataType.STRING)
  @Field(() => Coin)
  public coin: Coin

  @Column(DataType.STRING)
  @Field()
  public amount: string

  @Default(RequestState.pending)
  @Column({
    type: DataType.ENUM,
    values: Object.values(RequestState),
  })
  @Field(() => RequestState)
  public state: RequestState

  @Column(DataType.DATE)
  @Field()
  public createdAt: Date

  @Column(DataType.DATE)
  @Field()
  public updatedAt: Date

  @Column(DataType.DATE)
  public deletedAt?: Date

  @BelongsTo(() => User, 'fromUserId')
  public fromUser: User

  @BelongsTo(() => User, 'toUserId')
  public toUser: User
}

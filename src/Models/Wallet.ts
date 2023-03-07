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
import { Field, ID, Int, ObjectType } from 'type-graphql'

import { Coin, EthereumChain, Network } from 'Constants/enums'

import User from './User'

const tableName = 'wallets'

@Table({
  timestamps: true,
  paranoid: true,
  underscored: true,
  tableName,
})
@ObjectType('Wallet')
export default class Wallet extends Model {
  public static tableName = tableName

  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  @Field(() => ID)
  public id: string

  @Column(DataType.UUID)
  @ForeignKey(() => User)
  @Field(() => ID)
  public userId: string

  @Column(DataType.STRING)
  @Field()
  public address: string

  @Column(DataType.STRING)
  @Field(() => Coin)
  public coin: Coin

  @Column(DataType.STRING)
  @Field(() => ID, { nullable: true })
  public twId?: string

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

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

import { IndustryCategory } from 'Constants/intrustryCategory'
import { JobPosition } from 'Constants/jobPosition'

import CV from './CV'
import User from './User'

const tableName = 'Certificates'

@Table({
  timestamps: true,
  paranoid: true,
  underscored: true,
  tableName,
})
@ObjectType('Certificate')
export default class Certificate extends Model {
  public static tableName = tableName

  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  @Field(() => ID)
  public id: string

  @ForeignKey(() => CV)
  @Column(DataType.UUID)
  public cvId: string

  @BelongsTo(() => CV)
  public cv: CV

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  public userId: string

  @BelongsTo(() => User)
  public user: User

  @Column(DataType.UUID)
  @Field({ nullable: true })
  public issuer: string

  @Column(DataType.BOOLEAN)
  @Field({ nullable: true })
  public isVerified: boolean

  @Column(DataType.STRING)
  @Field({ nullable: true })
  public blockchainId: string

  @Column(DataType.DATE)
  @Field({ nullable: true })
  public dateOfIssued: Date

  @Column(DataType.STRING)
  @Field({ nullable: true })
  public name: string

  @Column(DataType.STRING)
  @Field({ nullable: true })
  public certUrl: string

  @Column(DataType.STRING)
  @Field({ nullable: true })
  public type: string

  @Column(DataType.DATE)
  @Field({ nullable: true })
  public createdAt: Date

  @Column(DataType.DATE)
  @Field({ nullable: true })
  public origirinalDate: Date

  @Column(DataType.DATE)
  @Field({ nullable: true })
  public expirationDate: Date

  @Column(DataType.STRING)
  @Field({ nullable: true })
  public metaData: string

  @Column(DataType.BOOLEAN)
  @Field({ defaultValue: true })
  public isPubic: boolean

  @Column(DataType.DATE)
  @Field({ nullable: true })
  public updatedAt: Date

  @Column(DataType.DATE)
  @Field({ nullable: true })
  public deletedAt?: Date

  @BelongsTo(() => CV)
  public certificates: CV
}

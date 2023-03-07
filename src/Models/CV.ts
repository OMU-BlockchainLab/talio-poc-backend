import {
  BelongsTo,
  BelongsToMany,
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

import Certificate from './Certificate'
import User from './User'

const tableName = 'CVs'

@Table({
  timestamps: true,
  paranoid: true,
  underscored: true,
  tableName,
})
@ObjectType('CV')
export default class CV extends Model {
  public static tableName = tableName

  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  @Field(() => ID)
  public id: string

  @Column(DataType.STRING)
  @Field()
  public objective: string

  @Column(DataType.STRING)
  @Field()
  public cvUrl: string

  @Column(DataType.NUMBER)
  @Field({ nullable: true })
  public minExpectedSalary?: number

  @Column(DataType.NUMBER)
  @Field({ nullable: true })
  public maxExpectedSalary?: number

  @Column(DataType.NUMBER)
  @Field({ nullable: true })
  public numberOfYearsExperience?: number

  @Column(DataType.STRING)
  @Field({ nullable: true })
  public skills?: string

  @Column(DataType.STRING)
  @Field({ nullable: true })
  public tags?: string

  @Column({ type: DataType.ENUM, values: Object.values(JobPosition) })
  @Field()
  public jobPosition: string

  @Column({ type: DataType.ENUM, values: Object.values(IndustryCategory) })
  @Field()
  public industryCategory: string

  @Column(DataType.DATE)
  @Field()
  public createdAt: Date

  @Column(DataType.DATE)
  @Field()
  public updatedAt: Date

  @Column(DataType.DATE)
  @Field({ nullable: true })
  public deletedAt?: Date

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  @Field()
  public createdBy: string

  @BelongsTo(() => User)
  public user: User
}

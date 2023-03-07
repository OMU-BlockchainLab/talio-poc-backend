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

import Permission from './Permission'
import Role from './Role'
import User from './User'

const tableName = 'roles_permissions'

@Table({
  timestamps: true,
  paranoid: true,
  underscored: true,
  tableName,
})
@ObjectType('RolePermission')
export default class RolePermission extends Model {
  public static tableName = tableName

  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  @Field(() => ID)
  public id: string

  @ForeignKey(() => Role)
  @Column(DataType.UUID)
  public roleId: string

  @ForeignKey(() => Permission)
  @Column(DataType.UUID)
  public permissionId: string

  @BelongsTo(() => Permission)
  public permissionObj: Permission

  @Column(DataType.DATE)
  @Field()
  public createdAt: Date

  @Column(DataType.DATE)
  @Field()
  public updatedAt: Date

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  @Field({ nullable: true })
  public createdById: string

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  @Field({ nullable: true })
  public updatedById: string
}

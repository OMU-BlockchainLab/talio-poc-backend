import {
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

import Permission from './Permission'
import RolePermission from './RolePermission'
import User from './User'

export enum RoleStatus {
  active = 'active',
  inactive = 'inactive',
}

const tableName = 'roles'

@Table({
  timestamps: true,
  paranoid: true,
  underscored: true,
  tableName,
})
@ObjectType('Role')
export default class Role extends Model {
  public static tableName = tableName

  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  @Field(() => ID)
  public id: string

  @Column(DataType.STRING)
  @Field()
  public name: string

  @Column(DataType.STRING)
  @Field()
  public code: string

  @Default(RoleStatus.active)
  @Column({ type: DataType.ENUM, values: Object.values(RoleStatus) })
  public status: string

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  @Field({ nullable: true })
  public createdById: string

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  @Field({ nullable: true })
  public updatedById: string

  @Column(DataType.DATE)
  @Field()
  public createdAt: Date

  @Column(DataType.DATE)
  @Field()
  public updatedAt: Date

  @Column(DataType.DATE)
  @Field({ nullable: true })
  public deletedAt?: Date

  @BelongsToMany(() => Permission, () => RolePermission)
  public permissions: Permission[]
}

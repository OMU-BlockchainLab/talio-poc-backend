import {
  BelongsToMany,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'
import { Field, ID, ObjectType } from 'type-graphql'

import Role from './Role'
import RolePermission from './RolePermission'

export enum RoleStatus {
  active = 'active',
  inactive = 'inactive',
}

const tableName = 'permissions'

@Table({
  timestamps: true,
  paranoid: true,
  underscored: true,
  tableName,
})
@ObjectType('Permission')
export default class Permission extends Model {
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

  @Column(DataType.STRING)
  @Field()
  public modulePrefix: string

  @Default(RoleStatus.active)
  @Column({ type: DataType.ENUM, values: Object.values(RoleStatus) })
  public status: string

  @Column(DataType.DATE)
  @Field()
  public createdAt: Date

  @Column(DataType.DATE)
  @Field()
  public updatedAt: Date

  @Column(DataType.DATE)
  @Field({ nullable: true })
  public deletedAt?: Date

  @BelongsToMany(() => Role, () => RolePermission)
  public roles: Role[]
}

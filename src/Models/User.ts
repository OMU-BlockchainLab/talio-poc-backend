import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'
import { Field, ID, ObjectType } from 'type-graphql'

import Contact from './Contact'
import EmailCredential from './EmailCredential'
import Role from './Role'
import UserProfile from './UserProfile'

export enum OnboardingStep {
  guide = 'guide',
}

export enum UserRole {
  user = 'user',
  admin = 'admin',
  superAdmin = 'superAdmin',
  sysman = 'sysman',
  organization = 'organization',
  Organization = 'Organization',
  sysMan = 'sysMan',
  SysMan = 'SysMan',
  Sysman = 'Sysman',
}
export enum UserTypeRole {
  user = 'user',
  mod = 'mod',
}

export enum UserState {
  active = 'active',
  deactivated = 'deactivated',
}

const tableName = 'users'

@Table({
  timestamps: true,
  paranoid: true,
  underscored: true,
  tableName,
})
@ObjectType('User')
export default class User extends Model {
  public static tableName = tableName

  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  @Field(() => ID)
  public id: string

  @Default(UserState.active)
  @Column({ type: DataType.ENUM, values: Object.values(UserState) })
  @Field(() => UserState)
  public state: UserState

  @Column({ type: DataType.ENUM, values: Object.values(UserRole) })
  public role: UserRole

  @ForeignKey(() => Role)
  @Column(DataType.UUID)
  @Field({ nullable: true })
  public roleId: string

  @Column({ type: DataType.ENUM, values: Object.values(UserTypeRole) })
  @Field(() => UserTypeRole)
  public type: UserTypeRole

  @Default(0)
  @Column(DataType.BOOLEAN)
  @Field({ nullable: true, defaultValue: 0 })
  public isVerified: boolean

  @BelongsTo(() => Role)
  public roleObj: Role

  @Column(DataType.INTEGER)
  @Field({ nullable: true, defaultValue: 0 })
  public weight: number

  @Column(DataType.BOOLEAN)
  public groupOnlyContacts: boolean

  @Column(DataType.JSONB)
  public onboardingSteps?: OnboardingStep[]

  @Column(DataType.DATE)
  @Field({ nullable: true })
  public onboardingCompletedAt?: Date

  @Column(DataType.DATE)
  @Field({ nullable: true })
  public deactivatedAt?: Date

  @Column(DataType.DATE)
  @Field({ nullable: true })
  public lastLoginAt?: Date

  @Column(DataType.DATE)
  @Field()
  public createdAt: Date

  @Column(DataType.DATE)
  @Field()
  public updatedAt: Date

  @Column(DataType.DATE)
  public deletedAt?: Date

  @Column(DataType.DATE)
  @Field({ nullable: true })
  public deactivationAt?: Date

  @HasOne(() => UserProfile)
  public profile?: UserProfile

  @HasMany(() => EmailCredential)
  public emailCredentials?: EmailCredential[]

  @HasMany(() => Contact)
  public contacts?: Contact[]
}

import { ArgsType, Field } from 'type-graphql'

@ArgsType()
export class UpdateSystemSettingsArgs {
  @Field(() => Boolean, { nullable: true })
  public maintenanceMode?: boolean

  @Field(() => [String], { nullable: true })
  public iosMaintenanceModeVersions?: string

  @Field(() => [String], { nullable: true })
  public androidMaintenanceModeVersions?: string
}

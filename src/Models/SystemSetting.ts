import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'

export enum SystemSettingKey {
  maintenanceMode = 'global.maintenance_mode',
  iosMaintenanceModeVersions = 'ios.maintenance_mode_versions',
  androidMaintenanceModeVersions = 'android.maintenance_mode_versions',
}

const tableName = 'system_settings'

@Table({
  timestamps: true,
  paranoid: true,
  underscored: true,
  tableName,
})
export default class SystemSetting extends Model {
  public static tableName = tableName

  @PrimaryKey
  @Column(DataType.STRING)
  public key: SystemSettingKey

  @Column(DataType.STRING)
  public value: string

  @Column({ type: DataType.DATE })
  public createdAt: Date

  @Column({ type: DataType.DATE })
  public updatedAt: Date

  @Column({ type: DataType.DATE })
  public deletedAt?: Date
}

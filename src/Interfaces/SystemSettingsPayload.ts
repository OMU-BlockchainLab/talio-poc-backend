export default interface SystemSettingsPayload {
  maintenanceMode: boolean
  iosMaintenanceModeVersions: string[]
  androidMaintenanceModeVersions: string[]
}

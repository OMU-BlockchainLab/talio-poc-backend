import { NotificationKind } from 'Constants/enums'

export default interface NotificationPayload {
  kind: NotificationKind

  text?: string
  payload?: Record<string, unknown>
}

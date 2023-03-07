import request from 'superagent'

import { ONESIGNAL } from 'Config'

import { CommonError } from 'Services/Errors'
import { createScopedLog } from 'Services/Log'

const log = createScopedLog('[OneSignal]')

const API_URL = 'https://onesignal.com/api/v1'

async function sendNotification({
  message,
  userIds,
  data,
}: {
  message: string | Record<string, unknown>
  userIds: string[]
  data?: Record<string, unknown>
}) {
  const contents = typeof message === 'string' ? { en: message } : message

  const payload: Record<string, unknown> = {
    app_id: ONESIGNAL.APP_ID,
    contents,
    data,
    include_external_user_ids: userIds,
  }

  try {
    log.info(
      `Try to sent message with content: ${JSON.stringify(
        contents,
      )} to ${JSON.stringify(userIds)}`,
    )

    const result = ONESIGNAL.IS_ENABLE
      ? await request
          .post(`${API_URL}/notifications`)
          .set('Authorization', `Basic ${ONESIGNAL.API_KEY}`)
          .send(payload)
      : {}

    log.info(`Message sent`)
    return result
  } catch (error: any) {
    log.error(`Failed to send message`)
    throw new CommonError(error.response?.error?.text)
  }
}

export default { sendNotification }

import { SNS } from 'aws-sdk'

import { AWS } from 'Config'

import { CommonError } from 'Services/Errors'
import log from 'Services/Log'
import redisClient from 'Services/Redis'

const sns = new SNS({
  accessKeyId: AWS.ACCESS_KEY_ID,
  secretAccessKey: AWS.SECRET_ACCESS_KEY,
  region: AWS.REGION,
})

const topics = {
  app: AWS.SNS_APP_TOPIC,
}

const subjects = {
  contactCreated: 'contact_created',
  contactBlocked: 'contact_blocked',
  contactUnblocked: 'contact_unblocked',
  contactUpdated: 'contact_updated',
  requestCreated: 'request_created',
  requestAccepted: 'request_accepted',
  requestDeclined: 'request_declined',
  transactionCreated: 'transaction_created',
  userSignUp: 'user_sign_up',
  userUpdated: 'user_updated',
  userDeleted: 'user_deleted',
}

interface SNSBaseParams {
  topic: string
  subject: string
}
function checkBaseParams(params: SNSBaseParams) {
  if (!params.topic) {
    throw new CommonError('[SNS] cannot sendMessage: no topic provided')
  }
  if (!params.subject) {
    throw new CommonError('[SNS] cannot sendMessage: no subject provided')
  }
}

interface SendMessageParams extends SNSBaseParams {
  message: Record<string, unknown>
}
async function sendMessage(params: SendMessageParams) {
  checkBaseParams(params)

  if (!params.message) {
    throw new CommonError('[SNS] cannot sendMessage: no message provided')
  }

  const msgStr = JSON.stringify(params.message)
  log.debug(
    `[SNS] Sending message: topic=${params.topic} subject=${params.subject} message=${msgStr}`,
  )

  try {
    const publishParams = {
      Subject: params.subject,
      Message: msgStr,
      TopicArn: params.topic,
    }

    // TODO: move outside SNS service
    await redisClient.publish(params.subject, msgStr)

    return sns.publish(publishParams).promise()
  } catch (error) {
    throw new CommonError(
      `[SNS] cannot sendMessage to topic=${params.topic} subject=${params.subject}: ${error.message}`,
    )
  }
}

export default {
  topics,
  subjects,

  sendMessage,
}

import { parseUrl } from 'Utils/paths'

interface Envs {
  NODE_ENV?: string
}

const { NODE_ENV } = process.env as Envs

export const IS_PRODUCTION = NODE_ENV === 'production'
export const IS_DEVELOPMENT = NODE_ENV === 'development'
export const IS_TEST = NODE_ENV === 'test'

function getEnv(env: string): string {
  return process.env?.[env] || ''
}

export function toBool(value: string): boolean {
  return value === 'true'
}

export const PORT = getEnv('PORT')

export const BUILD = getEnv('CI_BUILD')

export const FRONTEND = {
  URL: getEnv('FRONTEND_URL'),
}

export const BACKEND = {
  URL: getEnv('BACKEND_URL'),
}

export const DATABASE = {
  URL: getEnv('DATABASE_URL'),
  CHAT_URL: getEnv('CHAT_DATABASE_URL'),
  LOGGING_DISABLED: getEnv('DATABASE_LOGGING_DISABLED') === 'true',
}

const REDIS_URL = getEnv('REDIS_URL')

const redisUrl = parseUrl(REDIS_URL)

export const REDIS = {
  HOST: redisUrl.hostname || 'localhost',
  PORT: parseInt(redisUrl.port || '6379', 10),
}

export const EXPIRES = {
  EMAIL_CONFIRMATION: getEnv('EMAIL_CONFIRMATION_EXPIRE') || '7d',
  CHANGE_EMAIL_PASSWORD: getEnv('CHANGE_EMAIL_PASSWORD_EXPIRE') || '1d',
  ACCESS_TOKEN: getEnv('ACCESS_TOKEN_EXPIRE') || '1w',
  REFRESH_TOKEN: getEnv('REFRESH_TOKEN_EXPIRE') || '1y',
}

export const LOG = {
  LEVEL: getEnv('LOG_LEVEL') || 'info',
  SQL_DISABLED: getEnv('LOG_SQL_DISABLED') === 'true',
  GRAPHQL_DISABLED: getEnv('LOG_GRAPHQL_DISABLED') === 'true',
}

export const SECRETS = {
  JWT: getEnv('SECRETS_JWT'),
  SESSION: getEnv('SECRETS_SESSION'),
}

export const AWS = {
  REGION: getEnv('AWS_REGION'),
  ACCESS_KEY_ID: getEnv('AWS_ACCESS_KEY_ID'),
  SECRET_ACCESS_KEY: getEnv('AWS_SECRET_ACCESS_KEY'),
  S3_BUCKET: getEnv('AWS_S3_BUCKET'),
  SNS_APP_TOPIC: getEnv('AWS_SNS_APP_TOPIC'),
}

export const SENDGRID = {
  EMAIL_FROM: 'info@startupcraft.io',
  KEY: getEnv('SENDGRID_API_KEY'),
}

export const SENTRY = {
  DSN: getEnv('SENTRY_DSN'),
}

export const ONESIGNAL = {
  API_KEY: getEnv('ONESIGNAL_API_KEY'),
  APP_ID: getEnv('ONESIGNAL_APP_ID'),
  IS_ENABLE: getEnv('IS_ENABLE_ONESIGNAL') || false,
}

export const BULL = {
  HISTORY_LIFETIME: getEnv('BULL_HISTORY_LIFETIME') || '2w',
}

export const CRON = {
  BULL_GC: getEnv('CRON_BULL_GC') || '0 0 * * *',
}

export const WEB3 = {
  FEE_ADDRESS: getEnv('WEB3_FEE_ADDRESS'),
  FEE_PERCENT: 1,
  APP_FEE: 1,
}

export const MAILER = {
  MAIL_HOST: getEnv('MAIL_HOST'),
  MAIL_PORT: parseInt(getEnv('MAIL_PORT'), 10),
  MAIL_FROM: getEnv('MAIL_FROM'),
  MAIL_IS_SECURE: toBool(getEnv('MAIL_IS_SECURE')),
  MAIL_USER: getEnv('MAIL_USER'),
  MAIL_PASS: getEnv('MAIL_PASS'),
}

export const SUPER_ACCOUNT = {
  SUPER_ADMIN_EMAIL: getEnv('SUPER_ADMIN_EMAIL'),
  SUPER_ADMIN_PASSWORD: getEnv('SUPER_ADMIN_PASSWORD'),
}

export const PASS_PHRASE = {
  PHRASE_ROOT_ACCOUNT: getEnv('PHRASE_ROOT_ACCOUNT'),
}

/* eslint-disable no-console */
import reduce from 'lodash/reduce'

import { LOG } from 'Config'

type LogLevel = 'debug' | 'info' | 'warn' | 'error'

const logLevels = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
}

const currentLL = logLevels[LOG.LEVEL as LogLevel]

type LogHandlerType = (
  message?: string | Error | Record<string, unknown>,
  ...optionalParams: any[]
) => void

const log: {
  debug: LogHandlerType
  info: LogHandlerType
  warn: LogHandlerType
  error: LogHandlerType
} = {
  debug: currentLL <= logLevels.debug ? console.log.bind(console) : () => {},
  info: currentLL <= logLevels.info ? console.info.bind(console) : () => {},
  warn: currentLL <= logLevels.warn ? console.warn.bind(console) : () => {},
  error: currentLL <= logLevels.error ? console.error.bind(console) : () => {},
}

export function createScopedLog(prefix: string) {
  return reduce(
    Object.keys(log),
    (acc: Record<string, any>, key: string) => {
      acc[key] = log[key as LogLevel].bind(log[key as LogLevel], prefix)
      return acc
    },
    {},
  )
}

export default log

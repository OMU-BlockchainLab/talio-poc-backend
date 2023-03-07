import {
  JobsOptions,
  Queue,
  QueueOptions,
  QueueScheduler,
  WorkerOptions,
} from 'bullmq'

import { IS_TEST, REDIS } from 'Config'

import { JobName, QueueName } from './names'

const connection = {
  host: REDIS.HOST,
  port: REDIS.PORT,
  db: IS_TEST ? 4 : 1,
}

export const RETRY = Symbol('RETRY-JOB')

export function getQueueOptions(options?: QueueOptions): QueueOptions {
  return { connection, ...options }
}

export function getWorkerOptions(options?: WorkerOptions): WorkerOptions {
  return { connection, ...options }
}

interface CheckRepeatableJobParams<T> {
  jobName: JobName
  queue: Queue<T>
  data: T
  options: JobsOptions
}
export async function checkRepeatableJob<T>({
  jobName,
  queue,
  data,
  options,
}: CheckRepeatableJobParams<T>) {
  const jobs = await queue.getRepeatableJobs()

  let jobInfo = jobs.find(job => job.name === jobName)

  if (jobInfo && jobInfo.cron !== options?.repeat?.cron) {
    await queue.clean(0, 999, 'delayed')

    await queue.removeRepeatableByKey(jobInfo.key)

    jobInfo = undefined
  }

  if (!jobInfo) {
    await queue.add(jobName, data, options)
  }
}

export function createQueue<T>({
  name,
  initializeWorker,
  initialize,
  initializeEvents,
  withScheduler = false,
}: {
  name: QueueName
  initializeWorker: (queue: Queue<T>) => void
  initialize?: (queue: Queue<T>) => Promise<void>
  initializeEvents?: (queue: Queue<T>) => void
  withScheduler?: boolean
}) {
  let scheduler

  if (withScheduler) {
    scheduler = new QueueScheduler(name, getQueueOptions())
  }

  const queue = new Queue<T>(
    scheduler ? scheduler.name : name,
    getQueueOptions(),
  )

  initializeWorker(queue)

  if (typeof initializeEvents === 'function') {
    initializeEvents(queue)
  }

  let initialized = false

  async function innerInitialize() {
    if (initialize) {
      await initialize(queue)
    }

    initialized = true
  }

  async function add({
    jobName,
    data,
    options,
  }: {
    jobName: JobName
    data: T
    options?: JobsOptions
  }) {
    if (!initialized) throw new Error(`Queue ${queue.name} is not initialized`)

    await queue.add(jobName, data, options)
  }

  return { queue, initialize: innerInitialize, add }
}

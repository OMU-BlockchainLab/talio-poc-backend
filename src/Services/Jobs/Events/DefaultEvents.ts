import { Job, Queue, QueueEvents } from 'bullmq'

import { createScopedLog } from 'Services/Log'

import { getQueueOptions } from '../utils'

export default function initializeEvents(queue: Queue) {
  const queueEvents = new QueueEvents(queue.name, getQueueOptions())

  const log = createScopedLog(`[${queue.name}-events]`)

  queueEvents.on('waiting', ({ jobId }) => {
    log.debug(`A job with ID ${jobId} is waiting`)
  })

  queueEvents.on('active', ({ jobId, prev }: { jobId: string; prev: Job }) => {
    log.debug(`Job ${jobId} is now active; previous status was ${prev}`)
  })

  queueEvents.on('completed', ({ jobId, returnvalue }) => {
    log.debug(`${jobId} has completed and returned ${returnvalue}`)
  })

  queueEvents.on('failed', ({ jobId, failedReason }) => {
    log.error(`${jobId} has failed with reason ${failedReason}`)
  })
}

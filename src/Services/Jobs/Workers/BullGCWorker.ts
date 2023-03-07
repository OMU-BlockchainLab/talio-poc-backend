import { Queue, Worker } from 'bullmq'
import ms from 'ms'

import { values } from 'lodash'

import { BULL } from 'Config'

import { JobName } from 'Services/Jobs/names'
import * as Queues from 'Services/Jobs/Queues'
import { getWorkerOptions } from 'Services/Jobs/utils'
import log from 'Services/Log'

import forEachPromise from 'Utils/forEachPromise'

const jobTypes = ['completed', 'failed']

export default function initializeWorker(queue: Queue) {
  const worker = new Worker(
    queue.name,
    async job => {
      switch (job.name) {
        case JobName.BullGC: {
          let counter: { [key: string]: number } = {}

          const timeToDeleteFrom =
            new Date().getTime() - ms(BULL.HISTORY_LIFETIME)

          await forEachPromise(values(Queues), async queue => {
            const { name } = queue.queue
            const jobs = await queue.queue.getJobs(jobTypes)

            await forEachPromise(jobs, async job => {
              if (job.timestamp < timeToDeleteFrom) {
                counter = {
                  ...counter,
                  [name]: counter?.[name] ? counter[name] + 1 : 1,
                }
                try {
                  await job.remove()
                } catch (error) {
                  log.error({ queueError: (error as Error)?.message })
                }
              }
            })
          })

          return counter
        }
        default:
          throw new Error(`No processor configured for ${job.name}`)
      }
    },
    getWorkerOptions(),
  )

  worker.on('completed', job => {
    log.debug({ completed: job.name })
  })
}

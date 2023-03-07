import { Queue, Worker } from 'bullmq'

import UserEntity from 'Entities/User'

import { User } from 'Models'

import { Op } from 'Services/Db'
import log from 'Services/Log'

import forEachPromise from 'Utils/forEachPromise'

import { JobName } from '../names'
import { getWorkerOptions } from '../utils'

export default function initializeWorker(queue: Queue) {
  const worker = new Worker(
    queue.name,
    async job => {
      switch (job.name) {
        case JobName.Deactivation: {
          const users = await User.findAll({
            where: { deactivationAt: { [Op.lte]: new Date() } },
          })

          const deletedUsers: string[] = []
          const progressTick = 100 / users.length

          await forEachPromise(users, async (user, index) => {
            await UserEntity.delete({ id: user.id })

            deletedUsers.push(user.id)

            await job.updateProgress(
              Math.min(Math.ceil((index + 1) * progressTick), 100),
            )
          })

          return { deletedUsers }
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

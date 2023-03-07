import initializeEvents from '../Events/DefaultEvents'
import { JobName, QueueName } from '../names'
import { checkRepeatableJob, createQueue } from '../utils'
import initializeWorker from '../Workers/DeactivationWorker'

export default createQueue({
  name: QueueName.Deactivation,
  initialize: async queue => {
    await checkRepeatableJob({
      jobName: JobName.Deactivation,
      queue,
      data: {},
      options: { repeat: { cron: '0 0 * * *' } },
    })
  },
  initializeEvents,
  initializeWorker,
  withScheduler: true,
})

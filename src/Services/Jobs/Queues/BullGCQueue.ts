import { CRON } from 'Config'

import initializeEvents from '../Events/DefaultEvents'
import { JobName, QueueName } from '../names'
import { checkRepeatableJob, createQueue } from '../utils'
import initializeWorker from '../Workers/BullGCWorker'

export default createQueue({
  name: QueueName.BullGC,
  initialize: async queue => {
    await checkRepeatableJob({
      jobName: JobName.BullGC,
      queue,
      data: null,
      options: { repeat: { cron: CRON.BULL_GC } },
    })
  },
  initializeEvents,
  initializeWorker,
  withScheduler: true,
})

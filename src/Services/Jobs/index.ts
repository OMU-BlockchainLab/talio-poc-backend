import { BullMQAdapter, setQueues } from 'bull-board'

import log from 'Services/Log'

import { JobName } from './names'
import { BullGCQueue, DeactivationQueue } from './Queues'
import router from './router'

async function initializeQueues() {
  await BullGCQueue.initialize()
  await DeactivationQueue.initialize()

  setQueues([
    new BullMQAdapter(BullGCQueue.queue),
    new BullMQAdapter(DeactivationQueue.queue),
  ])

  log.info('🐂 BullMQ queues initialized')
}

export default {
  initializeQueues,
  router,
  DeactivationQueue,
  JobName,
}

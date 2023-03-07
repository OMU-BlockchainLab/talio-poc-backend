export enum QueueName {
  Deactivation = 'deactivation',
  StakeStatistics = 'stake-statistics',
  CheckDeFiQueue = 'check-defi-queue',
  BullGC = 'bull-gc',
}

export enum JobName {
  Deactivation = `deactivation`,
  StakeStatistics = 'stake-statistics',
  CheckInternalFee = 'check-internal-fee',
  CheckStake = 'check-stake',
  CheckUnstake = 'check-unstake',
  CheckApproveSpent = 'check-approve-spent',
  CheckSwap = 'check-swap',
  BullGC = 'bull-gc',
}

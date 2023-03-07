export enum SortInputOrder {
  asc = 'asc',
  desc = 'desc',
}

export enum StakingPoolName {
  AutoCAKE = 'AutoCAKE',
  StakeCake = 'StakeCake',
  EarnXCN = 'EarnXCN',
  EarnCHR = 'EarnCHR',
  EarnMIX = 'EarnMIX',
  EarnMetis = 'EarnMetis',
  EarnGAL = 'EarnGAL',
  EarnANKR = 'EarnANKR',
}

export enum Coin {
  ethereum = 'ethereum',
  bitcoin = 'bitcoin',
  tron = 'tron',
  CAKE = 'CAKE',
  BNB = 'BNB',
  BEP20USDT = 'BEP20USDT',
  APP = 'APP',
}

export enum Network {
  Bitcoin = 0,
  Ethereum = 60,
  Tron = 195,
}

export enum EthereumChain {
  Mainnet = 1,
  SmartChain = 56,
}

export const StakingPoolCoin = {
  [StakingPoolName.AutoCAKE]: Coin.CAKE,
  [StakingPoolName.StakeCake]: Coin.CAKE,
  [StakingPoolName.EarnXCN]: Coin.CAKE,
  [StakingPoolName.EarnCHR]: Coin.CAKE,
  [StakingPoolName.EarnMIX]: Coin.CAKE,
  [StakingPoolName.EarnMetis]: Coin.CAKE,
  [StakingPoolName.EarnGAL]: Coin.CAKE,
  [StakingPoolName.EarnANKR]: Coin.CAKE,
}

export const CoinNetwork = {
  [Coin.ethereum]: [Network.Ethereum, EthereumChain.Mainnet],
  [Coin.bitcoin]: [Network.Bitcoin],
  [Coin.tron]: [Network.Tron],
  [Coin.CAKE]: [Network.Ethereum, EthereumChain.SmartChain],
  [Coin.BNB]: [Network.Ethereum, EthereumChain.SmartChain],
  [Coin.BEP20USDT]: [Network.Ethereum, EthereumChain.SmartChain],
  [Coin.APP]: [EthereumChain.SmartChain],
}

export enum NotificationKind {
  transactionCreated = 'transactionCreated',
  requestCreated = 'requestCreated',
  requestAccepted = 'requestAccepted',
  requestDeclined = 'requestDeclined',
  contactCreated = 'contactCreated',
  inviteCreated = 'inviteCreated',
  stakingUnlocked = 'stakingUnlocked',
  stakeCompleted = 'stakeCompleted',
  unstakeCompleted = 'unstakeCompleted',
  swapped = 'swapped',
  spentApproved = 'spentApproved',
  deFiTransactionFailed = 'deFiTransactionFailed',
}

export enum Direction {
  both = 'both',
  incoming = 'incoming',
  outgoing = 'outgoing',
}

export enum Timeframe {
  year = 'year',
  quarter = 'quarter',
  month = 'month',
  week = 'week',
  day = 'day',
}

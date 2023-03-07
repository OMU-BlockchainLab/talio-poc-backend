import { Coin, StakingPoolName } from 'Constants/enums'

import ANKRVault from './Pool/Cake-ANKR'
import CHRVault from './Pool/Cake-CHR'
import GALVault from './Pool/Cake-GAL'
import MetisVault from './Pool/Cake-Metis'
import MIXVault from './Pool/Cake-MIX'
import XCNVault from './Pool/Cake-XCN'
import { APP, CAKE, USDT } from './BEP20'
import CakePool from './CakePool'
import CakeVault from './CakeVault'

export const PoolContracts = {
  [StakingPoolName.AutoCAKE]: CakeVault,
  [StakingPoolName.StakeCake]: CakePool,
  [StakingPoolName.EarnXCN]: XCNVault,
  [StakingPoolName.EarnCHR]: CHRVault,
  [StakingPoolName.EarnMIX]: MIXVault,
  [StakingPoolName.EarnMetis]: MetisVault,
  [StakingPoolName.EarnGAL]: GALVault,
  [StakingPoolName.EarnANKR]: ANKRVault,
}

export const CoinContracts = {
  [Coin.ethereum]: null,
  [Coin.bitcoin]: null,
  [Coin.tron]: null,
  [Coin.CAKE]: CAKE,
  [Coin.BNB]: null,
  [Coin.BEP20USDT]: USDT,
  [Coin.APP]: APP,
}

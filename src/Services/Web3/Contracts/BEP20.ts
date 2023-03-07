import web3 from 'Services/Web3'

import BEP20Abi from './ABI/BEP20.json'

function createBEP20Contract(address: string) {
  return new web3.eth.Contract(BEP20Abi as any, address)
}

const USDT = createBEP20Contract('0x55d398326f99059fF775485246999027B3197955')
const CAKE = createBEP20Contract('0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82')
const APP = createBEP20Contract('0x097f8ae21e81d4f248a2e2d18543c6b3cc0d8e59')

export { APP, CAKE, USDT }

import web3 from 'Services/Web3'

import CakePoolAbi from './ABI/CakePool.json'

const CakePool = new web3.eth.Contract(
  CakePoolAbi as any,
  '0x45c54210128a065de780C4B0Df3d16664f7f859e',
)

export default CakePool

import web3 from 'Services/Web3'

import PancakeRouterAbi from './ABI/PancakeRouter.json'

const PancakeRouter = new web3.eth.Contract(
  PancakeRouterAbi as any,
  '0x10ED43C718714eb63d5aA57B78B54704E256024E',
)

export default PancakeRouter

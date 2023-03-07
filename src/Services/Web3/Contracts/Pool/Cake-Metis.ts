import web3 from 'Services/Web3'

import SmartChefAbi from '../ABI/SmartChef.json'

const CakeVault = new web3.eth.Contract(
  SmartChefAbi as any,
  '0xC0A94bFF88EdCae7D5d79294C0e9954Ed75CBCb7',
)

export default CakeVault

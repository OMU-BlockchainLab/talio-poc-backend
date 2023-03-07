import web3 from 'Services/Web3'

import SmartChefAbi from '../ABI/SmartChef.json'

const CakeVault = new web3.eth.Contract(
  SmartChefAbi as any,
  '0x0F96E19Bdc787e767BA1e8F1aDD0f62cbdad87C8',
)

export default CakeVault

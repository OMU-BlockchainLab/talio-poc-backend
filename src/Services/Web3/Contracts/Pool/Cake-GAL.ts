import web3 from 'Services/Web3'

import SmartChefAbi from '../ABI/SmartChef.json'

const CakeVault = new web3.eth.Contract(
  SmartChefAbi as any,
  '0xa5D57C5dca083a7051797920c78fb2b19564176B',
)

export default CakeVault

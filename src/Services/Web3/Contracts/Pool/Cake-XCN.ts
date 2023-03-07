import web3 from 'Services/Web3'

import SmartChefAbi from '../ABI/SmartChef.json'

const CakeVault = new web3.eth.Contract(
  SmartChefAbi as any,
  '0xa79D37ce9DF9443eF4B6DEC2e38a8ecd35303adc',
)

export default CakeVault

import web3 from 'Services/Web3'

import SmartChefAbi from '../ABI/SmartChef.json'

const CakeVault = new web3.eth.Contract(
  SmartChefAbi as any,
  '0x2D17ec6cd0AF737B2adE40ea527d41ceEedc166f',
)

export default CakeVault

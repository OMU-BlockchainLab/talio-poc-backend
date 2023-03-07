import web3 from 'Services/Web3'

import SmartChefAbi from '../ABI/SmartChef.json'

const CakeVault = new web3.eth.Contract(
  SmartChefAbi as any,
  '0xc581345e1648CcE154978eA80bF8A584EC8aFDe0',
)

export default CakeVault

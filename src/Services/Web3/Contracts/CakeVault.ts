import web3 from 'Services/Web3'

import CakeVaultAbi from './ABI/CakeVault.json'

const CakeVault = new web3.eth.Contract(
  CakeVaultAbi as any,
  '0xa80240Eb5d7E05d3F250cF000eEc0891d00b51CC',
)

export default CakeVault

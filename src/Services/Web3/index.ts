import Web3 from 'web3'

const provider = new Web3.providers.HttpProvider(
  'https://bsc-dataseed1.binance.org:443',
)

const web3 = new Web3(provider)

export default web3

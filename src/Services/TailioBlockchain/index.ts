/* eslint-disable @typescript-eslint/no-var-requires */
const { ApiPromise, WsProvider, Keyring } = require('@polkadot/api')

const provider = new WsProvider('wss://smartcv.org')
const api = ApiPromise.create({ provider })
console.log('Connected to blockchain')

export default api

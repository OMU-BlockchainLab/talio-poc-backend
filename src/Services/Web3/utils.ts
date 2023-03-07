import { TransactionReceipt } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import find from 'lodash/find'
import forEach from 'lodash/forEach'
import get from 'lodash/get'

import { WEB3 } from 'Config'

import { Coin, CoinNetwork, Network } from 'Constants/enums'

import web3 from '.'

export function getReceiptEvent({
  contract,
  receipt,
  name,
}: {
  contract: Contract
  receipt: TransactionReceipt
  name: string
}): Record<string, any> | null {
  let event: Record<string, any> | null = null

  const eventJsonInterface = find(
    // @ts-ignore
    // eslint-disable-next-line no-underscore-dangle
    contract._jsonInterface,
    event => event.name === name && event.type === 'event',
  )

  if (!eventJsonInterface || !eventJsonInterface.inputs) return null

  const signature = get(eventJsonInterface, ['signature'])

  forEach(receipt.logs, log => {
    if (
      log.topics.includes(signature) &&
      log.address.toLowerCase() === contract.options.address.toLowerCase()
    )
      event = web3.eth.abi.decodeLog(
        eventJsonInterface.inputs || [],
        log.data,
        log.topics.slice(1),
      )
  })

  return event
}

export function calculatePercent(amount: number, coin: Coin) {
  const [network] = CoinNetwork[coin]

  if (network !== Network.Ethereum)
    throw new Error(`${network} not implemented yet`)

  return web3.utils.toWei(`${(amount / 100) * WEB3.FEE_PERCENT}`)
}

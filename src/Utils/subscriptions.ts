import { IncomingMessage } from 'http'
import { Socket } from 'net'
import url from 'url'
import { Server } from 'ws'

import { ApolloPath } from 'Constants/paths'

export default function installSubscriptionHandlers({
  adminSubscriptionServer,
}: {
  adminSubscriptionServer: Server
}) {
  return function upgradeHandler(
    req: IncomingMessage,
    socket: Socket,
    head: Buffer,
  ) {
    if (!req.url) return

    const { pathname } = url.parse(req.url)

    if (!pathname) return
    if (pathname.startsWith(ApolloPath.Admin)) {
      adminSubscriptionServer.handleUpgrade(req, socket, head, ws => {
        adminSubscriptionServer.emit('connection', ws, req)
      })
    }
  }
}

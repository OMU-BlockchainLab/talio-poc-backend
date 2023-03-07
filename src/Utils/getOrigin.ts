import pick from 'lodash/pick'

import Context from 'Services/Context'

export default function getOrigin(ctx: Context) {
  const header = ctx?.requestContext?.header
  return pick(header, ['user-agent', 'host', 'referer'])
}

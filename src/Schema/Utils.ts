import find from 'lodash/find'
import map from 'lodash/map'

import Context from 'Services/Context'

interface SubscriptionUserFilterParams {
  payload: any
  context: Context
}
export function subscriptionUserFilter({
  payload,
  context,
}: SubscriptionUserFilterParams) {
  return (
    context?.user?.id === payload?.userId ||
    context?.user?.id === payload?.payload?.userId
  )
}

interface SubscriptionNotUserFilterParams {
  payload: Record<string, unknown>
  context: Context
}
export function subscriptionNotUserFilter({
  payload,
  context,
}: SubscriptionNotUserFilterParams) {
  return context?.user?.id !== payload?.userId
}

export function getSelectedFields(queryName: string, info: any): any {
  const mainNode = find(
    info.fieldNodes,
    fieldNode => fieldNode?.name?.value === queryName,
  )

  if (!mainNode) return []

  return map(mainNode?.selectionSet?.selections, item => item?.name?.value)
}

import { Acl, RedisStore } from '@aclify/aclify'

import { UserRole } from 'Models/User'

import redis from 'Services/Redis'

import { ACTIONS, RESOURCES } from './constants'

// @ts-ignore
const acl = new Acl(new RedisStore(redis, 'acl'))

// Common roles
acl.allow(
  [UserRole.superAdmin, UserRole.admin, UserRole.user],
  [RESOURCES.ME],
  ACTIONS.VIEW,
)
acl.allow(
  [UserRole.superAdmin, UserRole.admin, UserRole.user],
  [RESOURCES.OWN_PROFILE],
  [ACTIONS.VIEW, ACTIONS.UPDATE],
)

// SuperAdmin role
acl.allow(
  UserRole.superAdmin,
  [
    RESOURCES.USER_PROFILES,
    RESOURCES.OWN_PROFILE,
    RESOURCES.USERS,
    RESOURCES.STAKING_POOLS,
    RESOURCES.SYSTEM_SETTINGS,
  ],
  ACTIONS.ALL,
)

// Admin role
acl.allow(
  UserRole.admin,
  [
    RESOURCES.USER_PROFILES,
    RESOURCES.OWN_PROFILE,
    RESOURCES.USERS,
    RESOURCES.STAKING_POOLS,
    RESOURCES.SYSTEM_SETTINGS,
  ],
  ACTIONS.ALL,
)

// User role
acl.allow(
  UserRole.user,
  [
    RESOURCES.INVITE,
    RESOURCES.CONTACTS,
    RESOURCES.WALLETS,
    RESOURCES.REQUESTS,
    RESOURCES.STAKES,
    RESOURCES.DEFI_TRANSACTIONS,
  ],
  ACTIONS.ALL,
)
acl.allow(UserRole.user, [RESOURCES.USERS], ACTIONS.VIEW)
acl.allow(UserRole.user, [RESOURCES.ME, RESOURCES.CHANNELS], ACTIONS.UPDATE)
acl.allow(
  UserRole.user,
  [RESOURCES.TRANSACTIONS],
  [ACTIONS.CREATE, ACTIONS.VIEW],
)

export interface ResourceAction {
  resource: RESOURCES
  action: ACTIONS
}

export { ACTIONS, RESOURCES }

export default acl

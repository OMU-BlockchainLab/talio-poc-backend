import DataLoader from 'dataloader'

import {
  Contact,
  EmailCredential,
  Invite,
  User,
  UserProfile,
  Wallet,
} from 'Models'

import { allBy, by, CacheKey, complexBy, ComplexKey, Key } from './utils'

export interface DataLoaders {
  emailCredentials: {
    byId: DataLoader<Key, EmailCredential, CacheKey>
    primaryByUserId: DataLoader<Key, EmailCredential, CacheKey>
    allByUserId: DataLoader<Key, EmailCredential[], CacheKey>
  }

  userProfiles: {
    byUserId: DataLoader<Key, UserProfile, CacheKey>
  }

  wallets: {
    byId: DataLoader<Key, Wallet, CacheKey>
    allByUserId: DataLoader<Key, Wallet[], CacheKey>
  }

  contacts: {
    byCreatorIdAndUserId: DataLoader<ComplexKey, Contact, CacheKey>
  }
  invites: {
    byCreatorIdAndInvitedUserId: DataLoader<ComplexKey, Invite, CacheKey>
  }
  users: {
    byId: DataLoader<Key, User, CacheKey>
  }
}
export default (): DataLoaders => ({
  emailCredentials: {
    byId: by({ field: 'id', model: EmailCredential }),
    primaryByUserId: by({
      field: 'userId',
      model: EmailCredential,
      findOptions: { where: { isPrimary: true } },
      cacheKeyFn: (key: Key) => `primary:${key}`,
    }),

    allByUserId: allBy({
      field: 'userId',
      model: EmailCredential,
    }),
  },

  contacts: {
    byCreatorIdAndUserId: complexBy({
      fields: ['creatorId', 'userId'],
      model: Contact,
      cacheKeyFn: (key: ComplexKey) =>
        `contactsByCreatorIdAndUserId:${key.creatorId};;;${key.userId}`,
    }),
  },

  invites: {
    byCreatorIdAndInvitedUserId: complexBy({
      fields: ['creatorId', 'invitedUserId'],
      model: Invite,
      findOptions: { where: { acceptedAt: null } },
      cacheKeyFn: (key: ComplexKey) =>
        `invitesByCreatorIdAndInvitedUserId:${key.creatorId};;;${key.invitedUserId}`,
    }),
  },

  userProfiles: {
    byUserId: by({ field: 'userId', model: UserProfile }),
  },

  wallets: {
    byId: by({ field: 'id', model: Wallet }),
    allByUserId: allBy({ field: 'userId', model: Wallet }),
  },

  users: {
    byId: by({ field: 'id', model: User }),
  },
})

import { buildSchema, NonEmptyArray } from 'type-graphql'

import AuthTokensResolver from 'Schema/Shared/Resolvers/AuthTokens'
import DummyResolver from 'Schema/Shared/Resolvers/Dummy'
import FilesResolver from 'Schema/Shared/Resolvers/Files'

import CertResolver from 'Schema/Admin/Resolvers/Cert'
import CVResolver from 'Schema/Admin/Resolvers/CV'
import AdminEmailCredentialsResolver from 'Schema/Admin/Resolvers/EmailCredentials'
import AdminPermissionResolver from 'Schema/Admin/Resolvers/Permission'
import AdminRoleResolver from 'Schema/Admin/Resolvers/Role'
import AdminUserProfilesResolver from 'Schema/Admin/Resolvers/UserProfiles'
import AdminUsersResolver from 'Schema/Admin/Resolvers/Users'

import registerEnumTypes from 'Schema/registerEnumTypes'

import pubSub from 'Services/PubSub'

// eslint-disable-next-line @typescript-eslint/ban-types
type ResolversType = NonEmptyArray<Function> | NonEmptyArray<string>

export default async function createSchema() {
  registerEnumTypes()

  const sharedResolvers: ResolversType = [AuthTokensResolver, FilesResolver]

  const adminResolvers: ResolversType = [
    DummyResolver,
    AdminUsersResolver,
    AdminPermissionResolver,
    AdminRoleResolver,
    AdminEmailCredentialsResolver,
    AdminUserProfilesResolver,
    CVResolver,
    CertResolver,
  ]

  const adminSchema = await buildSchema({
    resolvers: [...sharedResolvers, ...adminResolvers],
    pubSub,
  })

  return {
    adminSchema,
  }
}

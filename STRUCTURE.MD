# Backend

## Technology Stack

Our backend build on Node.JS.

* Databases: PostgreSQL, Redis
* API: Koa, Apollo GraphQL, WS Subscriptions
* Data layer: Sequelize, DataLoaders
* Task runner and queue manager: BullMQ
* Services and integrations: SendGrid (mailing/templates), Twilio (SMS), AWS S3 (file management)
* Development environment: TypeScript, Yarn, ESLint, Prettier, Jest, ApiDoc, Lint-Staged, Husky
* Deployment and devOps: Ansible, Docker, CircleCI

## Project structure

### Database

#### Migrations

Migrations based on `sequelize-cli` package. To create a new one you should run command `yarn db:migration --name={migration_name}`. This command will create new file in `db/migrations` folder, which will look like:

```js
const baseTypes = require('../baseTypes')

module.exports = {
  up: (queryInterface, Sequelize) => {
    const types = baseTypes(Sequelize)

    return queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.createTable(
        'auth_tokens',
        {
          id: types.id,
          user_id: types.reference('users', 'id'),
        },
        { transaction },
      )
    })
  },

  down: queryInterface => {
    return queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.dropTable('auth_tokens', { transaction })
    })
  },
}
```

Please check file `db/baseTypes.js` which contains common DB types that can be helpful in ongoing development, like configurable references, basic timestamp fields, etc.

Also we have helper for changing enums – just check `db/changeEnum.js`.

After applying migrations locally you need to run `yarn db:dump` to reflect latest changes in `db/schema.sql`.

You can find additional information about migrations and Sequelize itself here: https://sequelize.org/v5/

#### Models

Models located in the app root (`src` folder). Below we will use paths relative  to `src` folder, so `Models` = `src/Models`.

Models written with `sequelize-typescript` package which provide clean and simple decorators:

```typescript
import {
  Table,
  Model,
  Column,
  Default,
  DataType,
  BelongsTo,
  PrimaryKey,
  ForeignKey,
} from 'sequelize-typescript'

import User from './User'

const tableName = 'auth_tokens'

interface Origin {
  'user-agent': string
  host: string
  referer: string
}

@Table({
  timestamps: false,
  paranoid: true,
  tableName,
})
export default class AuthToken extends Model<AuthToken> {
  public static tableName = tableName

  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  public id: string

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, field: 'user_id' })
  public userId: string

  @Column({ type: DataType.TEXT, field: 'access_key' })
  public accessKey: string

  @Column({ type: DataType.DATE, field: 'access_expires_at' })
  public accessExpiresAt: Date

  @Column({ type: DataType.TEXT, field: 'refresh_key' })
  public refreshKey?: string

  @Column({ type: DataType.DATE, field: 'refresh_expires_at' })
  public refreshExpiresAt?: Date

  @Column(DataType.JSONB)
  public origin?: Origin

  @BelongsTo(() => User)
  public user: User
}
```

> **IMPORTANT!**
> Models should not contain any additional logic like methods, hooks etc – just **columns** and **relations** definitions.

After creating a new one model you need to export it in the `Models/index.ts` file. Please take care about alphabetic order of the models on import and export. This rule applies to every manifest-like `index.ts` file.

You can find additional info about `sequelize-typescript` here: https://github.com/RobinBuschmann/sequelize-typescript#readme

#### DB Service

We have additional service which contains a lot of helpful utilites. Just check it, file located at `Services/Db`



## `src` structure

### `__mocks__`

TBD

### `__tests__`

TBD

### Config

Here we store all configuration stuff, like ENV variables, defaults, etc.

### Constants

In this folder we store enums/constants divided by logical parts, `auth`, `errors`, `files`, `paths`, common `enums`, etc.

### DataLoaders

We utilize DataLoaders to eliminate N+1 problem in GraphQL resolvers. Just check documentation about this pattern (https://github.com/graphql/dataloader) and follow use cases in the project.

> **IMPORTANT!**
> We should never use dataLoaders out of application `context`! DataLoaders store results in the memory – so if you will try to cache data in the application lifecycle (not in the request lifecycle) – you will get a lot of bugs.

### Entities

This is the main folder which contains business logic divided by entities. If you need to update User Profile – you should create file `Entities/UserProfile/updateUserProfile.ts` and export it with `default` export in the `Entities/UserProfile/index.ts`.

`Entities/UserProfile/updateUserProfile.ts ` example:

```typescript
import { USER_PROFILE_ERRORS } from 'Constants/errors'

import { UserProfile } from 'Models'

import { doInTransaction, Transaction } from 'Services/Db'
import { CommonError } from 'Services/Errors'

export default async function updateUserProfile({
  profile,
  values,
  transaction: tx,
}: {
  profile: UserProfile
  values: { firstName?: string; lastName?: string; photoUrl?: string }
  transaction?: Transaction
}) {
  if (!profile) {
    throw new CommonError(USER_PROFILE_ERRORS.NOT_FOUND)
  }

  return doInTransaction(async transaction => {
    return profile.update(values, { transaction })
  }, tx)
}
```

As you can see, we pass `profile`, `values` and optional `transaction` fields. If we will need to make complex updates somewhere upper in the logic – just pass transaction. If no transaction passed – `doInTransaction` wrapper will create a new one, instead it will use already opened transaction.

> **IMPORTANT!**
> We should not pass application `context` to the Entities methods, this methods should be context-independent (this will simplify unit-testing btw).

### Interfaces

Used to store common TS Interfaces, divided by files.

### Middleware

Here we store middleware stuff – like auth, dataLoaders and logging middleware.

### Models

Described in the Database section

### Policies

Home of all policies. If you need to manage access: check if user is authorized or not, check if user should get an access to some resources, etc. – let's place this policies here.

This folder contains manifest `index.ts` which export all available policies:

```typescript
import AdminPolicy from './Admin'
import UserPolicy from './User'

export {
  AdminPolicy,
  UserPolicy,
}
```

Every policy has own manifest which export default object with available methods:

```typescript
import isAuthorized from './isAuthorized'
import isUnauthorized from './isUnauthorized'

export default {
  isAuthorized,
  isUnauthorized,
}
```

You can decide what way will policy works – throw an error, return true/false or entity if all ok. For example, `UserPolicy.isAuthorized ` throws an error and return User:

```typescript
import Context from 'Services/Context'
import { UnauthorizedError } from 'Services/Errors'

export default async function isAuthorized(ctx: Context, message?: string) {
  if (!ctx.user?.id) {
    throw new UnauthorizedError(message)
  }

  return ctx.user
}
```

Sometimes you don't need to throw error (`AdminPolicy.isAdmin`):

```typescript
import { GENERIC_ERRORS } from 'Constants/errors'

import { UserRole } from 'Models/User'

import Context from 'Services/Context'
import { CommonError } from 'Services/Errors'

export default async function isAdmin(ctx: Context, throwError = true) {
  const condition = ctx.user?.role === UserRole.admin

  if (throwError && !condition) {
    throw new CommonError(GENERIC_ERRORS.ACCESS_DENIED)
  }

  return condition
}
```

It can be helpful if you check access inside GraphQL field resolver – so you can just switch off error and return boolean.

### Routes

Routes used for the REST API – files should be divided by resource URL:

```
{root_url}/health > Routes/health.ts
{root_url}/v1/auth/... > Routes/v1/auth.ts
{root_url}/v1/private/... > Routes/v1/private.ts
```

We utilize `@koa/router`, for additional information please read https://github.com/koajs/router/blob/master/API.md

### Schema

Home folder where GraphQL schema lives. We utilize `type-graphql` to describe resolvers, queries, mutations, subscriptions, types, arguments, inputs, etc. You can find more info here: https://typegraphql.com/docs/introduction.html.

By default, we have two schemas – `admin` and `public`. Also we have inner `shared` schema which allow us to have common resources for both schemas:

```typescript
export default async function createSchema() {
  registerEnumTypes()

  const sharedSchema = await buildSchema({
    resolvers: [UsersResolver],
    validate: false,
    pubSub,
  })

  const adminSchema = await buildSchema({
    resolvers: [AdminUsersResolver],
    validate: false,
    pubSub,
  })

  const publicSchema = await buildSchema({
    resolvers: [PublicUsersResolver],
    validate: false,
    pubSub,
  })

  return {
    adminSchema: mergeSchemas({
      schemas: [sharedSchema, adminSchema],
    }),
    publicSchema: mergeSchemas({
      schemas: [sharedSchema, publicSchema],
    }),
  }
}
```

#### Schema/Args

Shared arguments which we can use in both schemas (also can contain Input types)

#### Schema/Resolvers

Shared resolvers which we will use in both schemas. Resolvers should be super-thick, just descriptions, no logic should be present here:

```typescript
// file: Schema/Resolvers/Users/index.ts

import queries from './Queries'
import mutations from './Mutations'

@Resolver(() => UserType)
export default class UsersResolver {
  @Query(() => UserType)
  public me(@Ctx() ctx: Context) {
    return queries.me(ctx)
  }

  @Mutation(() => UserProfileType)
  public updateProfile(@Args() args: UpdateProfileArgs, @Ctx() ctx: Context) {
    return mutations.updateProfile(ctx, args)
  }

  @Subscription(() => NotificationType, {
    topics: [PubSubTopics.Notification],
    filter: subscriptionUserFilter,
  })
  public notifications(@Root() payload: NotificationPayload): NotificationType {
    return payload
  }
}
```

##### Schema/Resolvers/{entity}/Mutations/Queries

We connect mutations/queries here. All methods should be exported as default object. Every mutation/query method also should be thick and contains only `ACL` check if needed, `Policy` checks, and call to the `Entity` method without `Context` passed:

```typescript
// file: Schema/Resolvers/Users/Mutation/updateProfile.ts

import UserProfileEntity from 'Entities/UserProfile'

import Context from 'Services/Context'
import { ACTIONS, RESOURCES } from 'Services/ACL'

import { UpdateProfileArgs } from 'Schema/Shared/Args/Users'

export default async function updateProfile(
  args: UpdateProfileArgs,
  ctx: Context,
) {
  const user = await ctx.canAccess({
    resource: RESOURCES.OWN_PROFILE,
    action: ACTIONS.UPDATE,
  })

  const profile = await ctx.dataLoaders.userProfiles.byUserId.load(user?.id)

  return UserProfileEntity.update({ profile, values: args })
}
```



#### Schema/Admin

Contains `Args` and `Resolvers` folder – same as `Schema/Args` and `Schema/Resolvers` but for `Admin` schema only.

#### Schema/Public

Contains `Args` and `Resolvers` folder – same as `Schema/Args` and `Schema/Resolvers` but for `Public` schema only.

#### Schema/Types

Contains all GraphQL Type definitions. Main trick here – we define fields which we need to present in schema directly in `Models`, for example:

```typescript
// file: Models/User.ts

import { Field, ID, ObjectType } from 'type-graphql'

@Table({
  timestamps: true,
  paranoid: true,
  tableName,
})
@ObjectType('User') // <-- add object type here
export default class User extends Model<User> {
  // ...

  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  @Field(() => ID) // <-- no need to additional resolve – pass it from there
  public id: string

  @Default(UserState.active)
  @Column({ type: DataType.ENUM, values: Object.values(UserState) })
  @Field(() => UserState) // <-- no need to additional resolve – pass it from there
  public state: UserState

  @Column({ type: DataType.ENUM, values: Object.values(UserRole) })
  @Field(() => UserRole) // <-- no need to additional resolve – pass it from there
  public role: UserRole

  // ...
  // we also need this fields in Schema – but no @Field here. Will be resolved in Schema/Types/User.ts
  @HasOne(() => UserProfile)
  public profile?: UserProfile

  @HasMany(() => EmailCredential)
  public emailCredentials?: EmailCredential[]

  // ...
}
```

We need to extend model:

```typescript
// file: Schema/Types/User.ts

import User, { OnboardingStep } from 'Models/User'

@ObjectType('User') // <-- same typename as we define in the Model
export default class UserType extends User { // <-- extending User model
  @Field() // <-- virtual computed field
  public onboardingCompleted(@Root() root: User): boolean {
    return !!root.onboardingCompletedAt
  }

  // As long as User model already have field 'onboardingSteps', we need to call our
  // resolver method {fieldName}Resolver, and pass 'name': {fieldName}
  // which will be present in Schema
  @Field(() => [OnboardingStep], { name: 'onboardingSteps' })
  public onboardingStepsResolver(@Root() root: User) {
    return root.onboardingSteps || []
  }

  // If we need to resolve some fields which can be restricted to some users –
  // we can check Context here and restrict (policies should not throw errors here!)
  // Also we use dataloaders here to eliminate N+1 problem (imagine we try to load a huge
  // list of users – dataLoader will combine all similar queries to a single one).
  @Field(() => EmailCredentialType, { nullable: true })
  public async primaryEmailCredential(@Root() root: User, @Ctx() ctx: Context) {
    const canView = await EmailCredentialPolicy.canView(ctx, root.id)

    if (!canView) return null

    return ctx.dataLoaders.emailCredentials.primaryByUserId.load(root.id)
  }

  // Combined field resolver with overriding model field, policy, dataLoader
  @Field(() => [EmailCredentialType], {
    nullable: true,
    name: 'emailCredentials',
  })
  public async emailCredentialsResolver(
    @Root() root: User,
    @Ctx() ctx: Context,
  ) {
    const canView = await EmailCredentialPolicy.canView(ctx, root.id)

    if (!canView) return []

    return (
      root.emailCredentials ||
      ctx.dataLoaders.emailCredentials.allByUserId.load(root.id)
    )
  }
}

```

#### Schema/registerEnumTypes.ts

If you need to register a new enum in schema, you need to add some lines here:

```typescript
export default function registerEnumTypes() {
  // ...

  registerEnumType(EmailCredentialState, {
    name: 'EmailCredentialState',
    description: `EmailCredential states: ${Object.keys(EmailCredentialState)}`,
  })

  // ...
}
```

### Services

This folder contains all common business logic, written in Services way. `ACL`, `Auth`, `AWS`, `Email`, etc – all goes here.

### Utils

Collection of useful helpers – `promises`, `math`, `strings`, etc.

### app.ts

Application bootstrap file – here we initialize all application logic, Koa, middleware, GraphQL servers, error handlers, etc.

### index.ts

Here we import some packages, like env reader, metadata reflector, typings definition and run the Server.

### server.ts

Rollup application and gracefully shut it down.

### typings.ts

TypeScript modules declarations goes here.

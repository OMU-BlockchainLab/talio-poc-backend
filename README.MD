# StartupCraft Node boilerplate

### Prerequisites

Node.JS, Yarn

Optional: Postgres, Redis

ENVs: Ask your teammate for current version of `.env`

### Without docker


You need to have Postgres & Redis installed, and you need to set connection strings in `.env` file:
```sh
DATABASE_URL=postgres://<db_user>@localhost:5432/<db_name>
REDIS_URL=redis://127.0.0.1:6379/0
```

First, you need to install packages
```sh
yarn install
```

Then, you need to init and migrate database:
```sh
yarn db:migrate
```

```sh
yarn run-tsseed
```

Then, just run
```sh
yarn dev
```

http://localhost:6001/admin/graphql

### sign up account

mutation {
  signUp(
    email: "quangpro4@timbo.com"
    password: "Aa@123456"
    fullName: "quangprotimboxinhdep"
    roleId: "4baa40bf-9fed-408a-950f-9129961a70df"
  ) {
    ok
  }
}
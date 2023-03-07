/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import '@startupcraft/dotenv-config'
import 'Services/Db'

import permissionEntity from 'Entities/Permission'

import { Role } from 'Models'

import { ACTIONS, RESOURCES } from 'Services/ACL'

require('tsconfig-paths/register')

class ActionResource {
  public action: string

  public resource: string

  public constructor(action: string, resource: string) {
    this.action = action
    this.resource = resource
    return this
  }
}

async function run() {
  try {
    const data = []
    const resourceValueList: string[] = Object.values(RESOURCES)
    const actionValueList: string[] = Object.values(ACTIONS)

    for (const module of resourceValueList) {
      // eslint-disable-next-line no-restricted-syntax
      for (const action of actionValueList) {
        if (action !== ACTIONS.ALL) {
          const tmp = `${module.toUpperCase()}_${action.toUpperCase()}`
          const item = {
            name: action,
            code: tmp,
            modulePrefix: `${module.toUpperCase()}`,
            status: 'active',
          }
          data.push(item)
        }
      }
    }
    await permissionEntity.bulkCreate(data)
  } catch (e: any) {
    console.log(`Error ${e.message}`)
  }
}

export default run

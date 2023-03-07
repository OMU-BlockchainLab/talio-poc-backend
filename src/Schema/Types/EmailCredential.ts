import { ObjectType } from 'type-graphql'

import EmailCredential from 'Models/EmailCredential'

@ObjectType('EmailCredential')
export default class EmailCredentialType extends EmailCredential {}

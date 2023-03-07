import { ObjectType } from 'type-graphql'

import InviteType from './Invite'
import ListType from './List'

@ObjectType('InviteList')
export default class InviteListType extends ListType(InviteType) {}

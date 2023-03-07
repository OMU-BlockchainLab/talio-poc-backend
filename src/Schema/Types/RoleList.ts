import { ObjectType } from 'type-graphql'

import ListType from './List'
import RoleType from './Role'

@ObjectType('RoleList')
export default class RoleList extends ListType(RoleType) {}

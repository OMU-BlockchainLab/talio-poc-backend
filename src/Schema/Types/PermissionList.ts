import { ObjectType } from 'type-graphql'

import ListType from './List'
import PermissionType from './Permission'

@ObjectType('PermissionList')
export default class PermissionList extends ListType(PermissionType) {}

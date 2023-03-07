import { ObjectType } from 'type-graphql'

import ListType from './List'
import UserType from './User'

@ObjectType('UserList')
export default class UserListType extends ListType(UserType) {}

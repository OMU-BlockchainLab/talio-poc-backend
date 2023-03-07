import { ObjectType } from 'type-graphql'

import ListType from './List'
import UserProfile from './UserProfile'

@ObjectType('UserProfileList')
export default class UserProfileListType extends ListType(UserProfile) {}

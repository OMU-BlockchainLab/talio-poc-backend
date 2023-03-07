import { ObjectType } from 'type-graphql'

import ListType from './List'
import RequestType from './Request'

@ObjectType('RequestList')
export default class RequestListType extends ListType(RequestType) {}

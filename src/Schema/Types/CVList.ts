import { ObjectType } from 'type-graphql'

import CVType from './CV'
import ListType from './List'

@ObjectType('CVList')
export default class CVListType extends ListType(CVType) {}

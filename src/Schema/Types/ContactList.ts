import { ObjectType } from 'type-graphql'

import ContactType from './Contact'
import ListType from './List'

@ObjectType('ContactList')
export default class ContactListType extends ListType(ContactType) {}

import { ObjectType } from 'type-graphql'

import CertType from './Cert'
import ListType from './List'

@ObjectType('CertList')
export default class CertListType extends ListType(CertType) {}

import { Field, ObjectType } from 'type-graphql'

@ObjectType('Available')
export default class AvailableType {
  @Field()
  public available: boolean
}

import { Field, ObjectType } from 'type-graphql'

@ObjectType('Dashboard')
export default class DashboardType {
  @Field()
  public user: number

  @Field()
  public swapValue: number

  @Field()
  public transaction: number

  @Field()
  public staking: number
}

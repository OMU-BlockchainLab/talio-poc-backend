import { Field, ObjectType } from 'type-graphql'

@ObjectType('Ok')
export default class OkType {
  @Field()
  public ok: boolean

  public static get success(): OkType {
    return { ok: true }
  }
}

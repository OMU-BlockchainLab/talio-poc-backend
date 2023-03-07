import { ClassType, Field, Int, ObjectType } from 'type-graphql'

export default function ListType<TItem>(TItemClass: ClassType<TItem>) {
  @ObjectType({ isAbstract: true })
  abstract class ListTypeClass {
    @Field(() => Int)
    public count: number

    @Field(() => Int)
    public pages: number

    @Field(() => [TItemClass])
    public rows: TItem[]
  }

  return ListTypeClass
}

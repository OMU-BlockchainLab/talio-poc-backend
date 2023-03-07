import { ArgsType, Field, InputType, Int } from 'type-graphql'

import { SortInputOrder } from 'Constants/enums'

import Pagination from 'Interfaces/Pagination'
import Sort from 'Interfaces/Sort'

@InputType()
export class SortInput implements Sort {
  @Field(() => String)
  public column: string

  @Field(() => SortInputOrder)
  public order: SortInputOrder
}

@ArgsType()
export class PaginationArgs implements Pagination {
  @Field(() => Int, { nullable: true })
  public page?: number

  @Field(() => Int, { nullable: true })
  public limit?: number
}

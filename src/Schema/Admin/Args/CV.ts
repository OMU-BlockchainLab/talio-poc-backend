import { ArgsType, Field, ID, InputType } from 'type-graphql'

import { IndustryCategory } from 'Constants/intrustryCategory'
import { JobPosition } from 'Constants/jobPosition'

import { PaginationArgs, SortInput } from 'Schema/Shared/Args/Common'

@ArgsType()
export class CVsArgs extends PaginationArgs {
  @Field({ nullable: true })
  public search?: string

  @Field(() => [SortInput], { nullable: true })
  public sort?: SortInput[]
}

@ArgsType()
export class DeleteCVArgs {
  @Field(() => ID)
  public id: string
}

@ArgsType()
export class DeleteManyCVsArgs {
  @Field(() => [ID])
  public ids: string[]
}

@ArgsType()
export class UpdateCVArgs {
  @Field(() => [ID])
  public ids: string[]

  @Field(() => Boolean, { nullable: true })
  public isVerified?: boolean
}

@ArgsType()
export class CreateCVArgs {
  @Field()
  public objective: string

  @Field()
  public cvUrl: string

  @Field()
  public minExpectedSalary: number

  @Field()
  public maxExpectedSalary: number

  @Field()
  public numberOfYearsExperience: number

  @Field()
  public skills: string

  @Field()
  public tags: string

  @Field(() => JobPosition, { nullable: true })
  public jobPosition: string

  @Field(() => IndustryCategory, { nullable: true })
  public industryCategory: string
}

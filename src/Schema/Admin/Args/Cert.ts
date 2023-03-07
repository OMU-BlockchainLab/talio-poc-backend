import { ArgsType, Field, ID } from 'type-graphql'

import { PaginationArgs, SortInput } from 'Schema/Shared/Args/Common'

@ArgsType()
export class CertsArgs extends PaginationArgs {
  @Field({ nullable: true })
  public search?: string

  @Field(() => [SortInput], { nullable: true })
  public sort?: SortInput[]

  @Field(() => ID, { nullable: true })
  public userId: string

  @Field(() => ID, { nullable: true })
  public issuer?: string
}

@ArgsType()
export class DeleteCertArgs {
  @Field(() => ID)
  public id: string
}

@ArgsType()
export class DeleteManyCertsArgs {
  @Field(() => [ID])
  public ids: string[]
}

@ArgsType()
export class UpdateCertArgs {
  @Field(() => [ID])
  public ids: string[]

  @Field(() => Boolean, { nullable: true })
  public isVerified?: boolean

  @Field({ nullable: true })
  public blockchainId?: string
}

@ArgsType()
export class CreateCertArgs {
  @Field()
  public certUrl: string

  @Field(() => ID)
  public userId: string

  public cvId: string

  @Field({ nullable: true })
  public issuer: string

  @Field({ nullable: true })
  public dateOfIssued: Date

  @Field({ nullable: true })
  public name: string

  @Field({ nullable: true })
  public origirinalDate: Date

  @Field({ nullable: true })
  public expirationDate: Date

  @Field({ nullable: true })
  public metaData: string

  @Field({ nullable: true })
  public isPubic: boolean

  @Field({ nullable: true })
  public isVerified: boolean

  @Field({ nullable: true })
  public blockchainId: string
}

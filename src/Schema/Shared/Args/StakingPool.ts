import { ArgsType, Field } from 'type-graphql'

import { StakingPoolName } from 'Constants/enums'

@ArgsType()
export class StakingPoolArgs {
  @Field(() => StakingPoolName)
  public name: string
}

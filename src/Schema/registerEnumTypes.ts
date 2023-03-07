import { registerEnumType } from 'type-graphql'

import {
  Coin,
  Direction,
  Network,
  NotificationKind,
  SortInputOrder,
  StakingPoolName,
  Timeframe,
} from 'Constants/enums'
import { AttachmentType } from 'Constants/files'
import { IndustryCategory } from 'Constants/intrustryCategory'
import { JobPosition } from 'Constants/jobPosition'

import { EmailCredentialState } from 'Models/EmailCredential'
import { RequestState } from 'Models/Request'
import { OnboardingStep, UserRole, UserState, UserTypeRole } from 'Models/User'

export default function registerEnumTypes() {
  registerEnumType(EmailCredentialState, { name: 'EmailCredentialState' })

  registerEnumType(UserState, { name: 'UserState' })

  registerEnumType(UserRole, { name: 'UserRole' })

  registerEnumType(OnboardingStep, { name: 'OnboardingStep' })

  registerEnumType(SortInputOrder, { name: 'SortInputOrder' })

  registerEnumType(Coin, { name: 'Coin' })

  registerEnumType(RequestState, { name: 'RequestState' })

  registerEnumType(NotificationKind, { name: 'NotificationKind' })

  registerEnumType(Direction, { name: 'Direction' })

  registerEnumType(AttachmentType, { name: 'AttachmentType' })

  // TODO: should be renamed later
  registerEnumType(StakingPoolName, { name: 'StakingPool' })

  registerEnumType(Network, { name: 'Network' })

  registerEnumType(Timeframe, { name: 'Timeframe' })

  registerEnumType(UserTypeRole, { name: 'UserTypeRole' })

  registerEnumType(JobPosition, { name: 'JobPosition' })

  registerEnumType(IndustryCategory, { name: 'IndustryCategory' })
}

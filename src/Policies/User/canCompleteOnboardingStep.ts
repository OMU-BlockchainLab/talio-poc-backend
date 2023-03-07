import { USER_PROFILE_ERRORS } from 'Constants/errors'

import { User } from 'Models'

import { CommonError } from 'Services/Errors'

export default async function canCompleteOnboardingStep(user: User) {
  if (user.onboardingCompletedAt) {
    throw new CommonError(USER_PROFILE_ERRORS.ONBOARDING_COMPLETED)
  }

  return true
}

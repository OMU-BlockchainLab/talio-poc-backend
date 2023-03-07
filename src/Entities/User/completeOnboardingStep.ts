import difference from 'lodash/difference'
import uniq from 'lodash/uniq'

import User, { OnboardingStep, UserRole } from 'Models/User'

import { doInTransaction, Transaction } from 'Services/Db'

const REQUIRED_STEPS: Record<UserRole, OnboardingStep[]> = {
  [UserRole.user]: [OnboardingStep.guide],
  [UserRole.admin]: [],
  [UserRole.superAdmin]: [],
}

export default async function completeOnboardingStep({
  user,
  step,
  transaction: tx,
}: {
  user: User
  step: OnboardingStep
  transaction?: Transaction
}) {
  return doInTransaction(async transaction => {
    const updateFields: any = {
      onboardingSteps: uniq([...(user.onboardingSteps || []), step]),
    }
    // const requiredSteps = user.role ? REQUIRED_STEPS[user.role] : []
    // if (difference(requiredSteps, updateFields.onboardingSteps).length === 0) {
    updateFields.onboardingCompletedAt = new Date()
    // }
    return user.update(updateFields, { transaction })
  }, tx)
}

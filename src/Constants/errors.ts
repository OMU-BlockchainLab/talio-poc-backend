export const GENERIC_ERRORS = {
  ERROR: 'generic.error',
  NOT_AUTHORIZED: 'generic.notAuthorized',
  ACCESS_DENIED: 'generic.accessDenied',
  NOT_FOUND: 'generic.notFound',
  VALIDATION: 'generic.validation',
  S3: 'generic.s3Error',
  TRANSACTION_FAIL: 'generic.transactionFail',
}

export const AUTH_ERRORS = {
  USER_ALREADY_AUTHORIZED: 'auth.userAuthorized',
  USER_ALREADY_EXISTS: 'auth.userAlreadyExists',
  CONFIRMATION_TOKEN_INVALID: 'auth.confirmationTokenInvalid',
  CONFIRMATION_TOKEN_EXPIRED: 'auth.confirmationTokenExpired',
  LOGIN_REGEX_NO_MATCH: 'auth.loginRegexNoMatch',
  LOGIN_LENGTH_NO_MATCH: 'auth.loginLengthNoMatch',
  PASSWORD_REGEX_NO_MATCH: 'auth.passwordRegexNoMatch',
  PASSWORD_LENGTH_NO_MATCH: 'auth.passwordLengthNoMatch',
  PASSWORD_TOKEN_INVALID: 'auth.passwordTokenInvalid',
  PASSWORD_TOKEN_EXPIRED: 'auth.passwordTokenExpired',
  EMAIL_ALREADY_VERIFIED: 'auth.emailAlreadyVerified',
  EMAIL_NOT_FOUND: 'auth.emailNotFound',
  EMAIL_NOT_VERIFIED: 'auth.emailNotVerified',
  EMAIL_NOT_PRIMARY: 'auth.emailNotPrimary',
  EMAIL_ALREADY_EXISTS: 'auth.emailAlreadyExists',
  INCORRECT_EMAIL_OR_PASSWORD: 'auth.incorrectEmailOrPassword',
  USER_NOT_ALLOWED_EMAIL: 'auth.userNotAllowedEmail',
  ROLE_NOT_ALLOWED: 'auth.roleNotAllowed',
  INVALID_TOKEN: 'auth.invalidToken',
  INVALID_CODE: 'auth.invalidCode',
  VERIFICATION_LIMIT: 'auth.verificationLimit',
  SHOULD_CREATE_ACCOUNT_FIRST: 'auth.shouldCreateAccountFirst',
  INCORRECT_LOGIN_OR_PASSWORD: 'auth.incorrectLoginOrPin',
  INCORRECT_PASSWORD: 'auth.incorrectPin',
  INCORRECT_MEMO: 'auth.incorrectMemo',
  MEMO_ALREADY_SET: 'auth.memoAlreadySet',
}

export const USER_ERRORS = {
  NOT_FOUND: 'user.notFound',
  CANNOT_INVITE_SELF: 'user.cannotInviteSelf',
  ALREADY_INVITED: 'user.alreadyInvited',
  INVITE_NOT_FOUND: 'user.inviteNotFound',
  CONTACT_NOT_FOUND: 'user.contactNotFound',
  NO_PENDING_DEACTIVATION: 'user.noPendingDeactivation',
  ALREADY_PENDING_DEACTIVATION: 'user.alreadyPendingDeactivation',
}

export const USER_PROFILE_ERRORS = {
  NOT_FOUND: 'userProfile.notFound',
  NICKNAME_WRONG_LENGTH: 'userProfile.nicknameWrongLength',
  STATUS_MESSAGE_TOO_LONG: 'userProfile.statusMessageTooLong',
  ONBOARDING_COMPLETED: 'userProfile.onboardingAlreadyCompleted',
}

export const WALLET_ERRORS = {
  NOT_FOUND: 'wallet.notFound',
}

export const TRANSACTION_ERRORS = {
  TO_USER_NOT_FOUND: 'transaction.toUserNotFound',
}

export const CHANNEL_ERRORS = {
  NOT_MEMBER: 'channel.notMember',
  WRONG_ATTACHMENT_CONTENT_TYPE: 'channel.wrongAttachmentContentType',
}

export const DEFI_ERRORS = {
  CONTRACT_NOT_IMPLEMENTED: 'defi.contractNotImplemented',
  WRONG_APPROVAL_TRANSACTION_OWNER: 'defi.wrongApprovalTransactionOwner',
  WRONG_TRANSACTION_ID: 'defi.wrongTransactionId',
  TRANSACTION_NOT_FOUND: 'defi.transactionNotFound',
  TRANSACTION_ALREADY_CHECKED: 'defi.transactionAlreadyChecked',
  WRONG_SWAP_TRANSACTION_OUT_ADDRESS: 'defi.wrongSwapTransactionOutAddress',
  WRONG_SWAP_TRANSACTION_IN_ADDRESS: 'defi.wrongSwapTransactionInAddress',
  FAILED_TRANSACTION: 'defi.failedTransaction',
}

export const STAKE_ERRORS = {
  NOT_FOUND: 'stake.notFound',
  POOL_NOT_FOUND: 'stake.poolNotFound',
  WIZARD_NOT_FOUND: 'stake.wizardNotFound',
  WIZARD_ALREADY_EXISTS: 'stake.wizardAlreadyExists',
  WIZARD_ALREADY_COMPLETED: 'stake.wizardAlreadyCompleted',
  INCORRECT_AMOUNT: 'stake.incorrectAmount',
  WRONG_WALLET_FOR_POOL: 'stake.wrongWalletForPool',
  INTERNAL_FEE_ALREADY_COLLECTED: 'stake.internalFeeAlreadyCollected',
  INTERNAL_FEE_NOT_COLLECTED: 'stake.internalFeeNotCollected',
  WRONG_INTERNAL_FEE_TRANSACTION_FROM: 'stake.wrongInternalFeeTransactionFrom',
  WRONG_INTERNAL_FEE_TRANSACTION_TO: 'stake.wrongInternalFeeTransactionTo',
  WRONG_INTERNAL_FEE_TRANSACTION_AMOUNT:
    'stake.wrongInternalFeeTransactionAmount',
  CONTRACT_NOT_IMPLEMENTED: 'stake.contractNotImplemented',
  NO_EVENT: 'stake.noEvent',
}

export const PERMISSION_ERRORS = {
  NOT_FOUND: 'permission.notFound',
}

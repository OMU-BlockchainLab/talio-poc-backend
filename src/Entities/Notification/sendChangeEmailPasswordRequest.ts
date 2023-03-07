import { FRONTEND } from 'Config'

import { ChangeEmailPasswordRequest, EmailCredential } from 'Models'

import EmailService from 'Services/Email'

function getChangeEmailPasswordUrl(token: string) {
  return `${FRONTEND.URL}/auth/change-email-password?token=${token}`
}

export default async function sendChangeEmailPasswordRequest({
  emailCredential,
  changeEmailPasswordRequest,
}: {
  emailCredential: EmailCredential
  changeEmailPasswordRequest: ChangeEmailPasswordRequest
}) {
  return EmailService.sendWithTemplate({
    template: EmailService.Template.ChangeEmailPasswordRequest,
    to: emailCredential.email,
    templateParams: {
      changeEmailPasswordUrl: getChangeEmailPasswordUrl(
        changeEmailPasswordRequest.token,
      ),
    },
  })
}

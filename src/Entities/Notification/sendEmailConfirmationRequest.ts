import { FRONTEND } from 'Config'

import { EmailConfirmationRequest, EmailCredential } from 'Models'

import EmailService from 'Services/Email'

function getEmailConfirmationUrl(token: string) {
  return `${FRONTEND.URL}/auth/confirm-email?token=${token}`
}

export default async function sendEmailConfirmationRequest({
  emailCredential,
  emailConfirmationRequest,
}: {
  emailCredential: EmailCredential
  emailConfirmationRequest: EmailConfirmationRequest
}) {
  return EmailService.sendWithTemplate({
    template: EmailService.Template.EmailConfirmationRequest,
    to: emailCredential.email,
    templateParams: {
      emailConfirmationUrl: getEmailConfirmationUrl(
        emailConfirmationRequest.token,
      ),
    },
  })
}

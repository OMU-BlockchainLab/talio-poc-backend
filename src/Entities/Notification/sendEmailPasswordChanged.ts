import { EmailCredential } from 'Models'

import EmailService from 'Services/Email'

export default async function sendEmailPasswordChanged(
  emailCredential: EmailCredential,
) {
  return EmailService.sendWithTemplate({
    template: EmailService.Template.EmailPasswordChanged,
    to: emailCredential.email,
  })
}

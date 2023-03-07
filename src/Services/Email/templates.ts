import path from 'path'

export enum Template {
  ChangeEmailPasswordRequest,
  EmailConfirmationRequest,
  EmailPasswordChanged,
}

// Use SendGrid Template
export const EmailTemplateIds = {
  [Template.ChangeEmailPasswordRequest]: 'd-66ffaceb21634e339e8c1e88b2bab537',
  [Template.EmailConfirmationRequest]: 'd-ed78865dcc4f4468b8ce0ddf03e53176',
  [Template.EmailPasswordChanged]: 'd-593067fc6d514141ad3c1c8e12cde87f',
}

// Customer Direct Template
export const EmailTemplatePath = {
  [Template.ChangeEmailPasswordRequest]: path.resolve(
    __dirname,
    './mailer/templates/changePWRequest.ejs',
  ),
  [Template.EmailConfirmationRequest]: path.resolve(
    __dirname,
    './mailer/templates/adminInvitation.ejs',
  ),
  [Template.EmailPasswordChanged]: path.resolve(
    __dirname,
    './mailer/templates/passwordChanged.ejs',
  ),
}

// import sgMail from '@sendgrid/mail'

// import { SENDGRID } from 'Config'

import { createScopedLog } from 'Services/Log'

import { MailTransport } from './mailer'
import { EmailTemplateIds, EmailTemplatePath, Template } from './templates'

const log = createScopedLog('[Services/Email]')

// sgMail.setApiKey(SENDGRID.KEY)

interface SendWithTemplateParams {
  template: Template
  to: string
  subject?: string
  templateParams?: any
}
async function sendWithTemplate({
  template,
  to,
  subject,
  templateParams,
}: SendWithTemplateParams) {
  try {
    // await sgMail.send({
    //   to,
    //   from: SENDGRID.EMAIL_FROM,
    //   subject,
    //   templateId: EmailTemplateIds[template],
    //   dynamicTemplateData: templateParams,
    // })

    //  Change to smtp mail service
    await MailTransport.sendMail({
      htmlFile: EmailTemplatePath[template],
      payload: templateParams,
      subject,
      to,
    })
  } catch (error: any) {
    log.error(error.message)

    if (error.response) {
      log.error(error.response.body)
    }
  }
}

export default { sendWithTemplate, Template }

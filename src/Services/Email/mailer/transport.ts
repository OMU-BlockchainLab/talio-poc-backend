/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import path from 'path'

import { MAILER } from 'Config'

const ejs = require('ejs')
const nodemailer = require('nodemailer')

interface MailBaseOptions {
  from?: string
  to: string[] | string
  subject?: string
}

type MailHTMLOptions = MailBaseOptions & {
  htmlFile: string
  payload: { [kye: string]: any }
}

export type MailOptions = MailHTMLOptions

export class MailTransport {
  private static instance: MailTransport

  private readonly transporter

  private constructor() {
    this.transporter = nodemailer.createTransport({
      host: MAILER.MAIL_HOST,
      port: MAILER.MAIL_PORT,
      secure: MAILER.MAIL_IS_SECURE,
      auth: {
        user: MAILER.MAIL_USER,
        pass: MAILER.MAIL_PASS,
      },
    })
  }

  private static getTransporter() {
    if (!MailTransport.instance) {
      MailTransport.instance = new MailTransport()
    }

    return MailTransport.instance.transporter
  }

  private static compileHtml(opts: MailOptions): Promise<string> {
    return new Promise((resolve, reject) => {
      ejs.renderFile(
        opts.htmlFile,
        {
          ...opts.payload,
          basePartials: path.resolve(__dirname, './templates/partials'),
        },
        {},
        (err: any, str: string | PromiseLike<string>) => {
          if (err) {
            return reject(err)
          }
          return resolve(str)
        },
      )
    })
  }

  static async sendMail(opts: MailOptions) {
    await MailTransport.getTransporter().sendMail({
      from: opts.from ? opts.from : MAILER.MAIL_FROM,
      to: Array.isArray(opts.to) ? opts.to.join(', ') : opts.to,
      subject: opts.subject || 'SappChat ',
      html: await MailTransport.compileHtml(opts),
    })
  }
}

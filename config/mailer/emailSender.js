const nodemailer = require('nodemailer')
const mailgunTransport = require('nodemailer-mailgun-transport')
const emailTemplates = require('./emailTemplates')
const config = require('config')
const mailgunOptions = config.get('mailgunOptions')

module.exports = async (params) => {
  return new Promise(async (resolve, reject) => {
    const { emailType, subject, receivers, context } = params
    const { text, html } = emailTemplates(emailType, context)
    const mailgunTransporter = mailgunTransport(mailgunOptions)
    const transporter = nodemailer.createTransport(mailgunTransporter)

    try {
      const info = await transporter.sendMail({
        from: `Eviks <postmaster@sandboxb7e2acbe200e4d28b100fc8557f041d1.mailgun.org>`,
        to: receivers,
        subject,
        text,
        html,
      })

      console.log('Message sent: %s', info.messageId)

      resolve({ success: true, info })
    } catch (error) {
      console.error(error)
      reject({ success: false, error })
    }
  })
}

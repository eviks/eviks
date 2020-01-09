const nodemailer = require('nodemailer')
const mailgunTransport = require('nodemailer-mailgun-transport')
const emailTemplates = require('./emailTemplates')
const config = require('config')
const mailgunOptions = config.get('mailgunOptions')

module.exports = async params => {
  try {
    const { emailType, receivers, context } = params
    const { subject, text, html } = emailTemplates(emailType, context)
    const mailgunTransporter = mailgunTransport(mailgunOptions)
    const transporter = nodemailer.createTransport(mailgunTransporter)

    let info = await transporter.sendMail({
      from: `Eviks <postmaster@sandboxb7e2acbe200e4d28b100fc8557f041d1.mailgun.org>`,
      to: receivers,
      subject,
      text,
      html
    })

    console.log('Message sent: %s', info.messageId)
  } catch (error) {
    console.error(error)
  }
}

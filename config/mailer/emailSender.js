const nodemailer = require('nodemailer')
const emailTemplates = require('./emailTemplates')
const config = require('config')
const emailConnection = config.get('emailConnection')

module.exports = async params => {
  try {
    const { emailType, receivers, context } = params
    const { subject, text, html } = emailTemplates(emailType, context)
    const { host, port, secure, auth } = emailConnection
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth
    })

    let info = await transporter.sendMail({
      from: `Eviks <${emailConnection.auth.user}>`,
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

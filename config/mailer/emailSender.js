const nodemailer = require('nodemailer');
const mailgunTransport = require('nodemailer-mailgun-transport');
const config = require('config');
const emailTemplates = require('./emailTemplates');
const logger = require('../../utils/logger');

const mailgunOptions = config.get('mailgunOptions');

module.exports = async (params) => {
  const { emailType, subject, receivers, context } = params;
  const { text, html } = emailTemplates(emailType, context);
  const mailgunTransporter = mailgunTransport(mailgunOptions);
  const transporter = nodemailer.createTransport(mailgunTransporter);

  const info = await transporter.sendMail({
    from: `Eviks <info@eviks.xyz>`,
    to: receivers,
    subject,
    text,
    html,
  });

  logger.info('Message sent: %s', info.messageId);

  return { success: true, info };
};

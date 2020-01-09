const verificationHtml = context => {
  return `
<h1>Hello!</h1>
<br/>
Your verification code is ${context.activationCode}`
}

module.exports = (emailType, context) => {
  switch (emailType) {
    case 'verification':
      return {
        subject: 'Email Verification',
        text: '',
        html: verificationHtml(context)
      }
  }
}

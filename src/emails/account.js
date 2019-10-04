const sgMail = require('@sendgrid/mail')

const sendgridApiKey = process.env.SENDGRID_API_KEY

sgMail.setApiKey(sendgridApiKey)

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'colin.fendrick@gmail.com',
    subject: 'Welcome!',
    text: `Thanks for joining ${name}`
  })
}

const sendCancelEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'colin.fendrick@gmail.com',
    subject: `Goodbye ${name}`,
    text: `We\'re sorry to hear you\'re leaving, ${name}.`
  })
}

module.exports = { sendWelcomeEmail, sendCancelEmail }

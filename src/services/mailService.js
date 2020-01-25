const nodemailer = require('nodemailer');

class mailService {

  constructor(){
    this.main = this.main.bind(this);
  }

  async main(email, name) {
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'pooopsapp@gmail.com',
        pass: 'shitterton'
      }
    });

    let info = await transporter.sendMail({
      from: '"the pOoops team" <poopsapp@gmail.com>',
      to: email,
      subject: 'Your registration was shitsessful',
      text: '',
      html: `<h1>You're in a lot of shit now.</h1>`
    })
    console.log('message sent', info.messageId)
  }
}

module.exports = mailService;
const nodemailer = require('nodemailer');

// configure SMTP transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 465,
  secure: true,
  security: 'STARTTLS',
  auth: {
    user: 'keven.gibson2@ethereal.email',
    pass: 'TgP2ThT4kgj3ZSzcKb',
  },
});

exports.sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: 'globalsuccess080@gmail.com',
    to,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions);
};

const nodemailer = require("nodemailer");

module.exports.transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: "gmail",
  port: 465,
  auth: {
    user: "allinoneatharv07@gmail.com",
    pass: "jhdp tnjd zkke itos",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function SendEmail() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Sunrise Event 👻" <allinoneatharv07@gmail.com>', // sender address
    to: "atharvgupta6027@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

// SendEmail().catch(console.error);

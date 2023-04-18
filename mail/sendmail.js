
const nodemailer = require("nodemailer");
  const sendMail=async (toMail,html)=>{
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user:'nmhieu0606@gmail.com',
          pass:'npdjfptzntvclsmw',
        },
      });
    
      var mailOptions = {
        from: 'nmhieu0606@gmail.com',
        to: toMail,
        subject: "Sending Email using Node.js",
        html:html
      };
    
       await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

  }
  module.exports=sendMail;
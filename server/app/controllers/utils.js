var nodemailer = require('nodemailer');
const AppVars = require('../config/vars')

// generate a random alphanumeric string
module.exports.generate_code = () => {
    return Math.random().toString(36).replace('0.', '') 
}

// send an email
module.exports.sendMail = (receiver, code) => {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: AppVars.mailer.mail,
          pass: AppVars.mailer.pass
        }
      });
      
      var mailOptions = {
        from: AppVars.mailer.mail,
        to: receiver,
        subject: 'Welcome to GreenWave',
        html: `<div>
                  <h1> Welcome To GreenWave </h1>
                  <p> Click the link below to verify your account </p>
                  <a href="http://localhost:9000/api/user/verify/${code}> Verify My Account </a>
               </div>`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

} 


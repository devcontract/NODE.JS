var nodemailer = require('nodemailer');
require('dotenv').config();

var transport = nodemailer.createTransport({
   service:process.env.MAIL_SERVICE,
   auth: {
       user: process.env.EMAIL_USER_NAME,
       pass: process.env.EMAIL_PASSWORD
   },
   tls: {
  rejectUnauthorized: false
   }
});

module.exports = {
    sendEmail(from, to, subject, html){
        return new Promise((resolve, reject)=>{
            transport.sendMail({from, subject, to, html }, (err, info)=>{
                if (err) reject(err);

                resolve(info);
            })
        })
    }
}

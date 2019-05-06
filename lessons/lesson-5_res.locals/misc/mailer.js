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
    },
     html : '<body style="background-color:orange"><div style="width: 50%; margin: 0 auto;background-color:orange;margin-top:15%"><hr> ' +
        '<p style="text-align: center"> <div style="text-align: center; font-size: 18px ; padding: 5px; margin: 0 0 0 0; width: auto; height: auto; border-radius:3px;">Please verify your email to signin </div> </p>' +
        '<p style="text-align:center;"> <a href="'+ process.env.SERVERPATH +' " style="text-decoration:none;color: whitesmoke;font-size: 18px ; padding: 5px; margin: 10% 0 10% 0; width: auto; height: auto;background-color:dodgerblue;border-radius:3px;">Verify Email</a><hr> ' +
        '</body>'
}


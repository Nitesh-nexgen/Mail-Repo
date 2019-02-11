const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const fs = require('fs');
const mail = require('./mail');

module.exports.handler = async (typeOfMailTemplate,bodyparams,mailparams) =>
{
    dotenv.config();
    var transporter = nodemailer.createTransport(
        {
            host : 'smtp.office365.com',
            port : 587,
            secure: false,
            auth : {user : process.env.email_ENV, pass : process.env.pass_ENV}
            // Type of Encrypted Connection: TLS
        }
    );
    
    var body = await mail.getTemplate(typeOfMailTemplate,bodyparams);

    var mailoptions = await mail.send(typeOfMailTemplate,mailparams,body);

    var mailInfo = await transporter.sendMail(mailoptions);

    console.log('Message sent : %s',mailInfo.messageId);
}


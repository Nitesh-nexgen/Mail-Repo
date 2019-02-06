const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const fs = require('fs');
const mail = require('../src/mail/util/mail')

async function sendMail()
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
    
    var typeOfMailTemplate = 'leave';

    var mailparams = {
        from : 'nitesh@nexgeniots.com',
        to : 'singhnitesh3712@gmail.com',
        subject : 'Approval of your leave application'
    }

    var bodyparams = {
        name : 'Nitesh',
        fromdate: '21 Feb 2018',
        todate: '24 Feb 2018',
        type: 'casual',
        approver : 'Harendra',
        sender:'Harendra',
        designation : 'Backend team leader'
    }
    var body = await mail.getTemplate(typeOfMailTemplate,bodyparams);

    var mailoptions = await mail.send(typeOfMailTemplate,mailparams,body);

    var mailInfo = await transporter.sendMail(mailoptions);

    console.log('Message sent : %s',mailInfo.messageId);

}

sendMail().then((data)=>
{
    var response = 
    {
        statusCode : 200,
        body: JSON.stringify({message: 'Message sent Successfully.'})
    }    

    console.log(JSON.stringify(response));
    
        
}).catch((err)=>
{
    var response = 
    {
        statusCode : 401,
        body: JSON.stringify({message: 'Message sending failed.'+err})
    }    

    console.log(JSON.stringify(response));
   
});
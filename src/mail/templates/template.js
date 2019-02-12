var fs = require('fs');
var nexgenlogo = fs.createReadStream('C:/Users/HP/nodejs/smtp/src/mail/util/images/nexgenlogo.jpg');

function getLeaveTemplate(body){

    return `<html>
                <body>
                <img style = "width:250px" src="nexgenlogo" />
                    <p>                    
                        Hi ${body.name},<br><br>
                        I am writing this letter to officially inform you that your ${body.type} leave from ${body.fromdate} to ${body.todate} have been
                        approved by ${body.approver}.
                        <br><br>
                        I understand how it feels to go on a vacation with your family. By doing so, you are making them feel special in your life.
                        I wish you all the best for your vacation and hope that you have a good time with your family.
                        <br><br>
                        Take Care,
                        <br><br>
                        Yours sincerely,
                        <br><br>
                        ${body.sender}<br>
                        ${body.designation}
                    </p>
                </body>
            </html>`
}

function getSalaryTemplate(body)
{
    return `<html>
                <body>
                    <p>
                        Hi ${body.name},<br><br>
                        I am writing this letter to officially inform you that your Account No. ${body.account} has been credited with an amount of 
                        INR ${body.amount} and has been approved by ${body.approver}.
                        <br><br>
                        Please find the attachment below to get the details of your salary transaction.
                        <br><br>
                        Take Care,
                        <br><br>
                        Yours sincerely,
                        <br><br>
                        ${body.sender}<br>
                        ${body.designation}
                    </p>
                </body>
            </html>`
}

module.exports = {
    getLeaveTemplate,
    getSalaryTemplate
}
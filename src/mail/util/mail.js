const fs = require('fs');
const template = require('../templates/template')
function send(temptype,mailparams,htmlBody)
{
    if(temptype === 'leave')
    {
        var mailOptions = 
        {
            from : mailparams.from,
            to : mailparams.to,
            subject : mailparams.subject,
            html: htmlBody
        }
        return mailOptions;
    }    
    else if(temptype === 'salary')
    {
        var mailOptions = 
        {
            from : mailparams.from,
            to : mailparams.to,
            subject : mailparams.subject,
            html: htmlBody,
            attachment:[
                filename = '',
                Content = fs.createReadStream('')
            ]

        }
        return mailOptions;
    }
}

function getTemplate(temptype,body)
{
    if(temptype==='leave')
    {
        return template.getLeaveTemplate(body);
    }
    else if(temptype === 'salary')
    {
        return template.getSalaryTemplate(body);
    }
}
module.exports = 
{
    send,
    getTemplate
}
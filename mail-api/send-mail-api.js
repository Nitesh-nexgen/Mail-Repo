var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var urlencodedparser = bodyparser.urlencoded({extended:true});
var sendmail = require('../src/mail/util/sendmail')

app.use(bodyparser.json());

app.post('/mail/send/',(req,res)=>
{
    console.log(req.body);

    var bodyparams = req.body.bodyparams;
    var mailparams = req.body.mailparams;
    var typeofmailtemplate = req.body.template;

    sendmail.handler(typeofmailtemplate,bodyparams,mailparams).then((data)=>
    {
        var response = 
        {
            statusCode : 200,
            body: JSON.stringify({message: 'Message sent Successfully.'})
        }    
        res.send(response);
        console.log(JSON.stringify(response));
        
            
    }).catch((err)=>
    {
        var response = 
        {
            statusCode : 401,
            body: JSON.stringify({message: 'Message sending failed.'+err})
        }    
        res.send(response);
        console.log(JSON.stringify(response));
    
    });
});

app.listen(8090);
const express = require('express');
const app = express();
const bodyparser = require('body-parser');

function getParams(body)
{
    if(body.template === 'salary-slip')
    {
        let params = {
            template: body.template,
            employee: body.employee_id,
            name: body.employee_name,
            designation: body.employee_designation,
            department: body.employee_department
        };
        return params;
    }
    else if(body.template === 'daily-report')
    {
        let params = {
            template: body.template,
            date : body.date,
            name : body.name,
            department : body.department,
            workdescription : body.workdescription,
            additionalnotes : body.additionalnotes,
            workemail : body.workemail
        };
        return params;
    }
}
app.use(bodyparser.json());

app.post('/pdf/generate/',(req,res)=>
{
    console.log(req.body);
    
    var params = getParams(req.body);
    //selecting the required template from req.body
    const pdf = require(`../src/mail/templates/pdf-templates/${params.template}-template`);

    pdf.generate(`${params.template}-${params.name}`,params).then((data)=>
    {
        var response = 
        {
            statusCode : 200,
            body: JSON.stringify({message: 'File generated Successfully.'})
        }    

        res.download(data.filedata.path,(err)=>
        {
            if(err)
                console.log('error came while downloading file : '+err);
            else
            {
                console.log('File downloaded successfully..');
                res.end(response);
                console.log(JSON.stringify(response));
            }

        })
        

    }).catch((err)=>
    {
        var response = 
        {
            statusCode : 401,
            body: JSON.stringify({message: 'File generation failed.'+err})
        }    
        res.send(response);
        console.log(JSON.stringify(response));
    });
      
});

app.listen(8091,(err)=>
{
    if(err)
        throw err;
    console.log('listening at port 8091...');
});

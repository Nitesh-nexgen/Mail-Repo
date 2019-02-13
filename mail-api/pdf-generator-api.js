const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const fs = require('fs');

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

app.get('/pdf/generate/',(err,res)=>
{
    var rawdata = fs.readFileSync('../static-temp/json/daily-report.json');
    var body = JSON.parse(rawdata);
    console.log(body);
    
    var params = getParams(body);
    //selecting the required template from req.body
    const pdf = require(`../src/mail/templates/pdf-templates/${params.template}-template`);
    
    pdf.generate(`${params.template}-${params.name}`,params,res).then((data)=>
    {
        console.log('File downloaded successfully...'+JSON.stringify(data));
    }).catch((err)=>
    {
        console.log('File cannot be downloaded due to following error : '+err);
    });

});

app.listen(8091,(err)=>
{
    if(err)
        throw err;

    console.log('listening at port 8091...');
});


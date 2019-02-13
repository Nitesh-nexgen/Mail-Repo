const PDFdocument = require("pdfkit");
const fs = require("fs");

const dailyReport = (fileName, params,res) => 
{    
    // let path = './../../../../asset/pdf/daily-report.pdf'
    const doc = new PDFdocument();
    res.writeHead(200,{
        "Content-Type":"application/pdf",
        "Content-disposition":"attachment; filename ="+fileName+".pdf"
    });
    doc.pipe(res);
    doc.image("../src/mail/util/assets/images/nexgenlogo.jpg", 450, 0, {
    fit: [120, 120]
    });
    doc
        .fillColor("#00aced")
        .font("Times-Bold")
        .fontSize(24)
        .underline(160, 40, 220, 40)
        .text("Daily Time Report", 0, 48, { align: "center" });
    
    //two lines down
    doc
        .fillColor("#0000")
        .font("Times-Bold")
        .fontSize(14)
        .text("Date", 50, 150)
        .text("Name",350,150);

    doc
        .fillColor("#707070")
        .font("Times-Roman")
        .fontSize(14)
        .text(`${params.date}`,50,170)
        .text(`${params.name}`, 350,170);
        
    //two lines down
    doc
        .fillColor("#0000")
        .font("Times-Bold")
        .fontSize(14)
        .text("Department: ",50,200);
    
    doc
        .fillColor("#707070")
        .font("Times-Roman")
        .fontSize(14)
        .text(`${params.department}`,50,220);
    doc.moveDown();
    doc.moveDown();
    doc
        .fillColor("#0000")
        .font("Times-Bold")
        .fontSize(14)
        .text("Description of Work Performed: ",50,270);
    doc.moveDown();
    doc
        .fillColor("#707070")
        .font("Times-Roman")
        .fontSize(14)
        .text(`${params.workdescription}`,50,290);
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc
        .fillColor("#0000")
        .font("Times-Bold")
        .fontSize(14)
        .text("Additional Notes: ",50,390);
    doc.moveDown();
    doc
        .fillColor("#707070")
        .font("Times-Roman")
        .fontSize(14)
        .text(`${params.additionalnotes}`,50,410);
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc
        .fillColor("#0000")
        .font("Times-Bold")
        .fontSize(14)
        .text("Your Work Email: ",50,470);
    doc.moveDown();
    doc
        .fillColor("#707070")
        .font("Times-Roman")
        .fontSize(14)
        .text(`${params.workemail}`,50,490);
    doc.end();
    
    return new Promise((resolve,reject)=>
    {
        var response = {
            statusCode : 200,
            body : JSON.stringify({message : 'PDF created successfully...'})
        }
        resolve(response);
    });
};

module.exports = {
    generate : dailyReport
}
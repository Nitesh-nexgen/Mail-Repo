const PDFdocument = require("pdfkit");
const fs = require("fs");

const salarySlip = (fileName, params) => {
  // let path = './../../../../asset/pdf/salary-slip.pdf'
  const doc = new PDFdocument();
  doc.pipe(fs.createWriteStream("../src/mail/util/assets/pdf/" + fileName + ".pdf"));
  doc.image("../src/mail/util/assets/images/nexgenlogo.jpg", 450, 0, {
    fit: [120, 120]
  });
  doc
    .fillColor("#00aced")
    .font("Times-Bold")
    .fontSize(24)
    .underline(187, 40, 165, 40)
    .text("Salary Slip 2019", 0, 48, { align: "center" });
  doc
    .fillColor("#0000")
    .font("Times-Bold")
    .fontSize(14)
    .text("Employee ID:   ", 50, 200);
  doc.moveDown();
  doc.moveUp();
  doc.moveUp();
  doc
    .fillColor("#707070")
    .font("Times-Roman")
    .fontSize(14)
    .text(`${params.employee}`, 50, 200, { align: "center" });
  doc.moveDown();
  doc
    .fillColor("#0000")
    .font("Times-Bold")
    .fontSize(14)
    .text("Name:  ");
  doc.moveDown();
  doc.moveUp();
  doc.moveUp();
  doc
    .fillColor("#707070")
    .font("Times-Roman")
    .fontSize(14)
    .text(`${params.name}`, { align: "center" });
  doc.moveDown();
  doc
    .fillColor("#0000")
    .font("Times-Bold")
    .fontSize(14)
    .text("Designation:   ");
  doc.moveDown();
  doc.moveUp();
  doc.moveUp();
  doc
    .fillColor("#707070")
    .font("Times-Roman")
    .fontSize(14)
    .text(`${params.designation}`, { align: "center" });
  doc.moveDown();
  doc
    .fillColor("#0000")
    .font("Times-Bold")
    .fontSize(14)
    .text("Department:    ");
  doc.moveDown();
  doc.moveUp();
  doc.moveUp();
  doc
    .fillColor("#707070")
    .font("Times-Roman")
    .fontSize(14)
    .text(`${params.department}`, { align: "center" });
  doc.moveDown();
  doc.end();
  return new Promise((resolve,reject)=>
  {
      var path = __dirname+'/../../util/assets/pdf/'+fileName+'.pdf';
      var file = fs.createReadStream(path);
      var stat = fs.statSync(path);
      var data = {
          name : fileName,
          filedata : file,
          filestat : stat
      }
      resolve(data);
  });
};
module.exports = {
  generate: salarySlip
};

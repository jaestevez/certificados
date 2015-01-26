var path = require('path');
var PDFDocument = require('pdfkit');
var blobStream  = require('blob-stream');
var fs = require('fs');
var dep = require('./dependency_pdf');

// create a document and pipe to a blob

var generate_pdf = function(nombre, sex_type, cc, exp_cc, time_live_num, tel , dir_user,name_file,res){
  if(time_live_num < 1 || time_live_num > 50)
    return null;
  var doc = new PDFDocument({margins: {
    top: 50,
    bottom: 0,
    left: 72,
    right: 72
  }});
  var stream = doc.pipe(blobStream());
  var dir_resources = __dirname.substring(0,__dirname.indexOf('api')) + 'assets/';
  doc.pipe(res);

  doc.image(dir_resources + 'template_pdf/header.png', 0, 0,{width: 620, height: 134});
  doc.image(dir_resources + 'template_pdf/logo.jpg', 40, 10,{width: 89, height: 90});
  //max width:620
  doc.moveDown(6);
  var fecha = [new Date().getDate(), new Date().getMonth(), new Date().getFullYear()];
  var month = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

  var title = "Bogotá D.C. "+month[fecha[1]] +" " +fecha[0] + " del " + fecha[2];

  var columna = "Se hace constar que " +
    (sex_type?dep.sexo[0]:dep.sexo[1])  + nombre + ", identificad" + (sex_type?'o':'a') + " con C.C. No. " + cc + " de " + exp_cc +
    ", reside en nuestro barrio desde hace " + ((time_live_num == 1)?"un":(dep.alpha_num_month[time_live_num - 1])) + " (" + time_live_num + ") año" + ((time_live_num > 1)?"s":"") +
    ", tiempo en el cual ha demostrado ser una persona honorable, responsable y respetuosa en todas sus actividades personales.";

  var direccion = "Con residencia en " + dir_user + ".";
  var telefono = "Tel. " + tel + ".";
  var expedicion =  "Dada a " + ((fecha[0] > 1)?"los ":"al ") + dep.alpha_num_month[fecha[0] - 1] + " (" + fecha[0] + ") día" + (fecha[0] > 1?"s":"") + " del mes de " + month[fecha[1]] + " del " + fecha[2] + ".";

  doc.text(title);
  doc.moveDown(6);
  doc.fontSize(18).text('A QUIEN PUEDA INTERESAR',{
    align: 'center'
  }).fontSize(13);
  doc.moveDown(4);
  doc.text(columna, {
    align: 'justify'
  });
  doc.moveDown(2);
  doc.text(direccion);
  doc.moveDown(1.5);
  doc.text(telefono);
  doc.moveDown(4);
  doc.text(expedicion);
  doc.moveDown(9);

  doc.text(dep.nom_firm_u1,75,640).text(dep.cc_firm_u1,75,653).text(dep.nom_firm_u2,300,640).text(dep.cc_firm_u2,300,653);

  doc.moveTo(75, 635).lineTo(225, 635).moveTo(300, 635).lineTo(450, 635).lineWidth(0.6).stroke();
  doc.moveTo(10, 777).lineTo(600, 777).stroke();
  doc.fontSize(7).text('https://certificadoscd.herokuapp.com, id: ' + name_file,10,778,{
  });
  doc.end();
}
module.exports.generate_pdf = generate_pdf;

var path = require('path')
    fs   	= require('fs'),
    uuid   	= require('node-uuid'),
    pdf = require('./dep_pdf/main_pdf'),//create pdf
    genId = require('./generate_id_pdf/main_id');//generate id
var text_request = '';
module.exports = {
  request: function (req, res) {

  },
  form: function (req, res) {
    sails.models.person.findOne({cc:req.body.cedula}).exec(function findOneCB(err,found){
      if( found != undefined) {
        /*console.log(found);*/
        res.view('user_ex', {person: found});
      }else{
        var impl = function(id_found) {
          var numbers_tel = req.body.tel_fijo;
          numbers_tel = req.body.tel_fijo;
          if (req.body.tel_movil != '')
            numbers_tel += ', ' + req.body.tel_movil;
          var dir_file = id_found;
          if(req.body.tiempo == '' && req.body.fecha == '' && req.body.fecha_last == '')
            res.send('no hay fecha o tiempo');
          if(req.body.tiempo != '' && (req.body.fecha != '' || req.body.fecha_last != ''))
            res.send('llenar solo un campo de los siguientes,fecha o tiempo');
          if(req.body.fecha == '')
            pdf.generate_pdf(req.body.nombre, req.body.sexo_type == 'M', req.body.cedula, req.body.c_exp,
            req.body.tiempo, numbers_tel, req.body.dirc, dir_file, res);
          else{
            pdf.generate_pdf_version2(req.body.nombre, req.body.sexo_type == 'M', req.body.cedula, req.body.c_exp,
            req.body.fecha,req.body.fecha_last == '' ? null : req.body.fecha_last, numbers_tel, req.body.dirc, dir_file, res);
          }
          /*DataBase create person*/
          sails.models.person.create({
            name: req.body.nombre,
            cc: req.body.cedula,
            cc_exp: req.body.c_exp,
            tel: req.body.tel_fijo,
            cel: req.body.tel_movil == '' ? null : req.body.tel_movil,
            sex: req.body.sexo_type,
            time_live: req.body.tiempo == '' ? null : req.body.tiempo,
            time_date: req.body.fecha == '' ? null : req.body.fecha,
            time_date_last: req.body.fecha_last == '' ? null : req.body.fecha_last,
            dir: req.body.dirc
          })
            .exec(function createCB(err, created) {
              if (err) console.log('error person\n' + err);
            });
          sails.models.files_pdf_format.create({
            id_person: req.body.cedula,
            name_file: dir_file,
            date_file: new Date()
          }).exec(function createCB(err, created) {
            if (err) console.log('error file format db ' + err);
          });
          setTimeout(function () {
            res.send();
          }, 250);
        };
        genId.generateId();
        genId.assignId(impl,req,res);
      }
    });
  },
  form_cc: function (req, res) {
    sails.models.person.findOne({cc:req.body.cc_query}).exec(function findOneCB(err,found) {
        if (found == undefined)
        res.send('No existe el usuario');
        else{
          var date_var = [found.time_date.getDate(), found.time_date.getMonth(), found.time_date.getFullYear()];
          date_var[1]++;
          if(String(date_var[0]).length < 2)
            date_var[0] = '0' + date_var[0];
          if(String(date_var[1]).length < 2)
            date_var[1] = '0' + date_var[1];
          found.time_date = date_var[0] + '/' + date_var[1] + '/' + date_var[2];
          if(found.time_date_last != null){
            var date_var_last = [found.time_date_last.getDate(), found.time_date_last.getMonth(), found.time_date_last.getFullYear()];
            date_var_last[1]++;
            if(String(date_var_last[0]).length < 2)
            date_var_last[0] = '0' + date_var_last[0];
            if(String(date_var_last[1]).length < 2)
              date_var_last[1] = '0' + date_var_last[1];
            found.time_date_last = date_var_last[0] + '/' + date_var_last[1] + '/' + date_var_last[2];
          }
          
          res.view('user_ex', {person:found});
        }
    });
  },
  query_cc: function (req, res) {
    sails.models.files_pdf_format.findOne({name_file:req.body.id_format}).exec(function findOneCB(err,found_id) {
      if (found_id == undefined)
          res.send('No existe el usuario');
      else
        sails.models.person.findOne({cc:found_id.id_person}).exec(function findOneCB(err,found) {
        if (found == undefined)
        res.send('No existe el usuario');
        else
          res.view('person_info', {person:{cc:found.cc , name:found.name , time:found.time_live ,state:req.body.validated }});
        });
    });
  },
  form_cc_id: function (req, res) {
    sails.models.person.findOne({cc:req.body.cc}).exec(function findOneCB(err,found){
        if( found == undefined) {
          res.send('Error interno');
        }else {
          var impl = function( id_found){
            var numbers_tel = found.tel;
            if (found.cel != null)
              numbers_tel += ', ' + found.cel;
            var dir_file = id_found;
            var date_struct = null;
            if(found.time_date){
            date_struct = found.time_date.getFullYear() + '-' + 
            ((String(found.time_date.getMonth()).length < 2)?'0' + (parseInt(found.time_date.getMonth()) + 1):parseInt(found.time_date.getMonth()) + 1) 
             + '-'+ ((String(found.time_date.getDate()).length < 2)?'0'+found.time_date.getDate():found.time_date.getDate());
             if(found.time_date_last != null){
              var date_struct_last = found.time_date_last.getFullYear() + '-' + 
              ((String(found.time_date_last.getMonth()).length < 2)?'0' + (parseInt(found.time_date_last.getMonth()) + 1):parseInt(found.time_date_last.getMonth()) + 1) 
               + '-'+ ((String(found.time_date_last.getDate()).length < 2)?'0'+found.time_date_last.getDate():found.time_date_last.getDate());
             }
             }
            console.log('date: '+found.time_date+'\n');
            console.log('date: '+date_struct+'\n');
            console.log('date: '+date_struct_last+'\n');
            if(found.time_date == '')
              pdf.generate_pdf(found.name, found.sex == 'M', found.cc, found.cc_exp,
              found.time_live, numbers_tel, found.dir, dir_file, res);
            else
              pdf.generate_pdf_version2(found.name, found.sex == 'M', found.cc, found.cc_exp,
              date_struct,date_struct_last, numbers_tel, found.dir, dir_file, res);
            sails.models.files_pdf_format.create({
              id_person: found.cc,
              name_file: dir_file,
              date_file: new Date()
            }).exec(function createCB(err, created) {
            });
            setTimeout(function () {
              res.send();
            }, 250);
          };
          genId.generateId();
          genId.assignId(impl,req,res);
        }
    });
  },
  query: function (req, res){
    text_request = 'registros: ';
    function queries_model(callback){
      sails.models.files_pdf_format.find()
        .exec(function (err, allTheStuff) {
          text_request += allTheStuff.length + '<br><br><hr>';
          var req_view = '';
          for (var i = 0; i < allTheStuff.length; i++) {
            req_view += allTheStuff[i].id_person + ': ' + allTheStuff[i].name_file;
            req_view += ' fecha: ' + allTheStuff[i].date_file ;
            req_view += ' estado: ' + allTheStuff[i].validated + "<br><hr>";
          }
          text_request += req_view;
          callback(text_request);
        });
    }
    queries_model(function(){
      return res.send(text_request);
    });
  }
};

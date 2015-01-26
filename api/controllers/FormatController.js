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
        console.log(found);
        res.view('user_ex', {person: found});
      }else{
        var impl = function(id_found) {
          var numbers_tel = req.body.tel_fijo;
          numbers_tel = req.body.tel_fijo;
          if (req.body.tel_movil != '')
            numbers_tel += ', ' + req.body.tel_movil;
          var dir_file = id_found;
          pdf.generate_pdf(req.body.nombre, req.body.sexo_type == 'M', req.body.cedula, req.body.c_exp,
            req.body.tiempo, numbers_tel, req.body.dirc, dir_file, res);
          sails.models.person.create({
            name: req.body.nombre,
            cc: req.body.cedula,
            cc_exp: req.body.c_exp,
            tel: req.body.tel_fijo,
            cel: req.body.tel_movil == '' ? null : req.body.tel_movil,
            sex: req.body.sexo_type,
            time_live: req.body.tiempo,
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
    sails.models.person.findOne({cc:req.body.num_cel}).exec(function findOneCB(err,found) {
        if (found == undefined)
        res.send('No existe el usuario');
        else
          res.view('user_ex', {person:found});
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
            pdf.generate_pdf(found.name, found.sex == 'M', found.cc, found.cc_exp,
              found.time_live, numbers_tel, found.dir, dir_file, res);
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
            req_view += ' fecha: ' + allTheStuff[i].date_file + "<br><hr>";
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

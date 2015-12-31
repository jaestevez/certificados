module.exports = {
  registros: function (req, res) {
      console.log(req.url);
      console.log(req.query);
      if(!req.query.start || !req.query.end){
  	sails.models.files_pdf_format.query('SELECT cc,name,time_live,date_file,validated,name_file FROM files_pdf_format f,person p where f.id_person = p.cc ',function(err, results) {
		  if (err) return res.serverError(err);
      console.log('numb 1');
			res.send(results.rows);
		});
      }else{
          sails.models.files_pdf_format.query('SELECT cc,name,time_live,date_file,validated,name_file FROM files_pdf_format f,person p where f.id_person = p.cc ',function(err, results) {
		if (err) return res.serverError(err);
              rowsf = results.rows;
              var results_mod = [];
              for(var i=parseInt(req.query.start);i<=parseInt(req.query.end);i++)
              results_mod.push(rowsf[i]);
              console.log('numb 2');
			res.send(results_mod);
		});
      }
  },
  cambioEstado: function (req, res){
  	res.send("{res:'cambio estado'}");
  },
  eliminar: function (req, res){
  	res.send("{res:'eliminar registro'}");
  },
  traer: function (req,res){
    sails.models.files_pdf_format.query('SELECT cc,name,time_live,date_file,validated,name_file' +
    ' FROM files_pdf_format f,person p where f.id_person = p.cc',function(err, results) {
		  if (err) return res.serverError(err);
			res.json(200,results.rows);
		});
  }
};

module.exports = {
  registros: function (req, res) {
  	sails.models.files_pdf_format.query('SELECT cc,name,time_live,date_file,validated,name_file FROM files_pdf_format f,person p where f.id_person = p.cc ',function(err, results) {
		if (err) return res.serverError(err);
			//res.send(results.rows);
			res.jsonp(JSON.parse(results.rows));
			//res.jsonp(JSON.parse(JSON.stringify(results.rows)));
		});
  },
  cambioEstado: function (req, res){
  	res.send("{res:'cambio estado'}");
  },
  eliminar: function (req, res){
  	res.send("{res:'eliminar registro'}");
  }
};
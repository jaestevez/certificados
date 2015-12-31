module.exports = {
	admin: function(req, res){

	},
	all_content: function(req, res){
		sails.models.files_pdf_format.query('SELECT cc,name,time_live,date_file,validated,name_file FROM files_pdf_format f,person p where f.id_person = p.cc ',function(err, results) {
			if (err) return res.serverError(err);
			//console.log(results.rows);
			res.view('admin', {formatos:results.rows});
		});
	},
	change_content: function(req, res){
		sails.models.files_pdf_format.findOne({name_file:req.body.data}).exec(function findOneCB(err,found_id) {
			sails.models.files_pdf_format.query("update files_pdf_format set validated='" + ((found_id.validated == 'validar')?'no validar':'validar') +"' where name_file ='"+ req.body.data+"'",function(err, results) {
				res.send('ok data');
				console.log('transaccion finalizada');
			});
		});
	},
	viewAdminAngular: function(req, res){
		/*sails.models.files_pdf_format.query('SELECT cc,name,time_live,date_file,validated,name_file FROM files_pdf_format f,person p where f.id_person = p.cc ',function(err, results) {
			if (err) return res.serverError(err);
			//console.log(results.rows);
			res.view('admin', {formatos:results.rows});
		});*/
		res.view('adminAngular',{});
	}
};

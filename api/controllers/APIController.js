module.exports = {
  registros: function (req, res) {
  	res.send("{res:'registros'}");
  },
  cambioEstado: function (req, res){
  	res.send("{res:'cambio estado'}");
  },
  eliminar: function (req, res){
  	res.send("{res:'eliminar registro'}");
  }
};
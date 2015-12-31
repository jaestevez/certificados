var listaRegistro;
$.ajax({
    url: '/registros',
      type: 'GET',
      data: '', // or $('#myform').serializeArray()
      success: function(data) {
        var time1 = new Date();
        console.log('carga completa: ' + (time1 - time0)/1000);
          listaRegistro = data;
      }
});

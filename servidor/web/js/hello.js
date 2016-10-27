$(document).ready(function() {
    lista = []
    objeto_consulta1 = {}
    objeto_consulta2 = {}

     url_get_consulta1 = "http://localhost:8080/consulta1"
        $.ajax({
        type: "GET",
        url: url_get_consulta1
        }).then(function(data) {
            var data_json = JSON.parse(data)
            console.log("data: ")
            console.log(data_json)
            lista = data_json.lista
            objeto_consulta1 = data_json.objeto
        $.each(lista, function (i, item) {
            $('#selector_consulta_1').append($('<option>', { 
                value: item,
                text : item 
            }));
        });
    });

    url_get_consulta2 = "http://localhost:8080/consulta2"
        $.ajax({
        type: "GET",
        url: url_get_consulta2
        }).then(function(data) {
            var data_json = JSON.parse(data)
            console.log("data: ")
            console.log(data_json)
            objeto_consulta2 = data_json.objeto
    });

    $( "#selector_consulta_1" )
    .change(function () {
    var str = "";
    $( "select option:selected" ).each(function() {
      str += $( this ).text() + " ";
    });
    str = str.replace(/\s/g, '');
    $( "#resultado_1_consulta_1" ).text( /*JSON.stringify(*/objeto_consulta1[str].promedio_seguidores/*)*/ );
    $( "#resultado_2_consulta_1" ).text( /*JSON.stringify(*/objeto_consulta1[str].promedio_RT/*)*/ );
    $( "#resultado_3_consulta_1" ).text( /*JSON.stringify(*/objeto_consulta1[str].relacion/*)*/ );
    $( "#resultado_1_consulta_2" ).text( /*JSON.stringify(*/objeto_consulta2[str].promedio_tuits/*)*/ );
    $( "#resultado_2_consulta_2" ).text( /*JSON.stringify(*/objeto_consulta2[str].promedio_RT/*)*/ );
    $( "#resultado_3_consulta_2" ).text( /*JSON.stringify(*/objeto_consulta2[str].relacion/*)*/ );
  })
  .change();

});
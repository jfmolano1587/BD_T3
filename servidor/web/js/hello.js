$(document).ready(function() {
    lista = []
    objeto_consulta1 = {}
    objeto_consulta2 = {}
    objeto_consulta3 = {}
    objeto_consulta_seguidores = {}
    objeto_consulta_robots = {}
    objeto_consulta_palabra_usuarios = {}
    lista_ht_sentimientos = []

    function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }

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

    url_get_consulta3 = "http://localhost:8080/consulta3"
        $.ajax({
        type: "GET",
        url: url_get_consulta3
        }).then(function(data) {
            var data_json = JSON.parse(data)
            console.log("data: ")
            console.log(data_json)
            objeto_consulta3 = data_json.objeto
    });

    url_get_consulta_seguidores = "http://localhost:8080/consulta_seguidores"
        $.ajax({
        type: "GET",
        url: url_get_consulta_seguidores
        }).then(function(data) {
            var data_json = JSON.parse(data)
            console.log("data consulta seguidores: ")
            console.log(data_json)
            objeto_consulta_seguidores = data_json[0]
    });

    url_get_consulta_robots = "http://localhost:8080/consulta_robots"
        $.ajax({
        type: "GET",
        url: url_get_consulta_robots
        }).then(function(data) {
            var data_json = JSON.parse(data)
            console.log("data consulta robots: ")
            console.log(data_json)
            objeto_consulta_robots = data_json[0]
    });

    url_get_consulta_palabras_usuarios = "http://localhost:8080/consulta_palabras_usuarios"
        $.ajax({
        type: "GET",
        url: url_get_consulta_palabras_usuarios
        }).then(function(data) {
            var data_json = JSON.parse(data)
            console.log("data consulta robots: ")
            console.log(data_json)
            objeto_consulta_palabra_usuarios = data_json[0]
    });

    url_get_consulta_palabras_colombia = "http://localhost:8080/consulta_palabras_colombia"
        $.ajax({
        type: "GET",
        url: url_get_consulta_palabras_colombia
        }).then(function(data) {
            var data_json = JSON.parse(data)
            console.log("data consulta Colombia: ")
            console.log(data_json)
            $.each(data_json, function (i, item) {
                console.log(item)
                $('#tabla_palabras_colombia').append("<tr><td>"+item['_id']['palabra']+"</td><td>"+item['value']+"</td></tr>");
            });
    });

    url_get_consulta_ht_sentimientos = "http://localhost:8080/consulta_ht_sentimientos"
        $.ajax({
        type: "GET",
        url: url_get_consulta_ht_sentimientos
        }).then(function(data) {
            var data_json = JSON.parse(data)
            console.log("data consulta lista_ht_sentimientos: ")
            console.log(data_json)
            data_json = shuffle(data_json)
            $.each(data_json, function (i, item) {
                var tam = item.value.neg + item.value.pos + item.value.neu
                if (tam>180){tam = 180}
                if (tam<20){tam = 20}
                $('#tg_container').append("<span style=\"font-size:"+tam+"%;\">"+"[#"+item._id.ht+" &#128513("+item.value.pos+")"+" &#128529("+item.value.neu+")"+" &#128545("+item.value.neg+")] "+"</span>");
            });
            //$('#tg_container').append("<span style=\"font-size:100%;\">Meili</span>");
    });

    url_get_consulta_palabras_ht = "http://localhost:8080/consulta_ht_personas"
        $.ajax({
        type: "GET",
        url: url_get_consulta_palabras_ht
        }).then(function(data) {
            var data_json = JSON.parse(data)
            console.log("data consulta Colombia: ")
            console.log(data_json)
            $.each(data_json, function (i, item) {
                console.log(item)
                $('#tabla_ht_personas').append("<tr><td>#"+item['_id']['ht']+"</td><td>"+item['_id']['usuario']+"</td><td>"+item['value']+"</td></tr>");
            });
    });

    url_get_consulta_lugares_ht = "http://localhost:8080/consulta_ht_lugares"
        $.ajax({
        type: "GET",
        url: url_get_consulta_lugares_ht
        }).then(function(data) {
            var data_json = JSON.parse(data)
            console.log("data consulta Colombia: ")
            console.log(data_json)
            $.each(data_json, function (i, item) {
                console.log(item)
                $('#tabla_ht_lugares').append("<tr><td>#"+item['_id']['ht']+"</td><td>"+item['_id']['lugar']+"</td><td>"+item['value']+"</td></tr>");
            });
    });

    $( "#selector_consulta_1" )
    .change(function () {
        var str = "";
        $( "select option:selected" ).each(function() {
          str += $( this ).text() + " ";
        });
        str = str.replace(/\s/g, '');
        $( "#titulo_tuitero" ).text( /*JSON.stringify(*/str/*)*/ );
        $( "#resultado_1_consulta_1" ).text( /*JSON.stringify(*/objeto_consulta1[str].promedio_seguidores/*)*/ );
        $( "#resultado_2_consulta_1" ).text( /*JSON.stringify(*/objeto_consulta1[str].promedio_RT/*)*/ );
        $( "#resultado_3_consulta_1" ).text( /*JSON.stringify(*/objeto_consulta1[str].relacion/*)*/ );
        $( "#resultado_1_consulta_2" ).text( /*JSON.stringify(*/objeto_consulta2[str].promedio_tuits/*)*/ );
        $( "#resultado_2_consulta_2" ).text( /*JSON.stringify(*/objeto_consulta2[str].promedio_RT/*)*/ );
        $( "#resultado_3_consulta_2" ).text( /*JSON.stringify(*/objeto_consulta2[str].relacion/*)*/ );
        $( "#resultado_1_consulta_3" ).text( /*JSON.stringify(*/objeto_consulta3[str].promedio_faveado/*)*/ );
        $( "#resultado_2_consulta_3" ).text( /*JSON.stringify(*/objeto_consulta3[str].promedio_favs/*)*/ );
        $( "#resultado_3_consulta_3" ).text( /*JSON.stringify(*/objeto_consulta3[str].relacion/*)*/ );
        $( "#resultado_robots_imagen img" ).remove();
        $( "#resultado_robots_imagen" ).append( /*JSON.stringify(*/"<img src=\""+objeto_consulta_robots[str].imagen+"\">"/*)*/ );
        $( "#resultado_robots_cuenta" ).text( /*JSON.stringify(*/objeto_consulta_robots[str].cuenta/*)*/ );
        $( "#resultado_robots_cantidad" ).text( /*JSON.stringify(*/objeto_consulta_robots[str].num_tweets/*)*/ );
        $( "#resultado_robots_fecha" ).text( /*JSON.stringify(*/objeto_consulta_robots[str].fecha/*)*/ );
        console.log(objeto_consulta_seguidores)
        console.log(objeto_consulta_seguidores[str])
        $('#tabla_resultados tr').not(':first').remove();
        $.each(objeto_consulta_seguidores[str], function (i, item) {
                console.log(item)
                $('#tabla_resultados').append("<tr><td>"+item['fecha']+"</td><td>"+item['tweet']+"</td><td>"+item['retweets']+"</td><td>"+item['seguidores']+"</td><td>"+item['delta']+"</td></tr>");
            });
        $('#tabla_palabras_usuarios tr').not(':first').remove();
        $.each(objeto_consulta_palabra_usuarios[str], function (i, item) {
                console.log(item)
                $('#tabla_palabras_usuarios').append("<tr><td>"+item['palabra']+"</td><td>"+item['cuenta']+"</td></tr>");
            });
  })
  .change();

});
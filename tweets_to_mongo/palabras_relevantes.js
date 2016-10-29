var map = function() {  
    lista_no_relevante = ["a",
    "alguien",
    "además",
    "ahora",
    "al",
    "algo",
    "algunos",
    "antes",
    "año",
    "años",
    "aquí",
    "así",
    "aunque",
    "bien",
    "bueno",
    "cada",
    "casa",
    "casi",
    "caso",
    "como",
    "cómo",
    "con",
    "contra",
    "cosas",
    "creo",
    "cuando",
    "d",
    "de",
    "decir",
    "del",
    "desde",
    "después",
    "día",
    "días",
    "dice",
    "dijo",
    "donde",
    "dos",
    "durante",
    "e",
    "ejemplo",
    "el",
    "él",
    "ella",
    "ellos",
    "entonces",
    "entre",
    "en",
    "era",
    "es",
    "esa",
    "ese",
    "eso",
    "esta",
    "está",
    "estaba",
    "estado",
    "estamos",
    "están",
    "estas",
    "este",
    "esto",
    "estoy",
    "estos",
    "forma",
    "fue",
    "general",
    "gente",
    "gobierno",
    "gran",
    "gracias",
    "ha",
    "había",
    "hace",
    "hacer",
    "hacia",
    "han",
    "hasta",
    "hay",
    "he",
    "hecho",
    "hombre",
    "hoy",
    "la",
    "las",
    "le",
    "les",
    "lo",
    "los",
    "luego",
    "lugar",
    "más",
    "mayor",
    "me",
    "mejor",
    "menos",
    "mi",
    "mí",
    "mientras",
    "mismo",
    "momento",
    "mucho",
    "mujer",
    "mundo",
    "muy",
    "nada",
    "ni",
    "no",
    "nos",
    "nosotras",
    "nosotros",
    "nuestra",
    "nuestras",
    "nuestro",
    "nuestros",
    "nunca",
    "o",
    "otra",
    "otras",
    "otro",
    "otros",
    "país",
    "para",
    "parece",
    "parte",
    "pero",
    "personas",
    "poco",
    "poder",
    "política",
    "por",
    "porque",
    "primera",
    "puede",
    "pueden",
    "pues",
    "q",
    "que",
    "qué",
    "rt",
    "se",
    "sea",
    "según",
    "ser",
    "será",
    "si",
    "sí",
    "sido",
    "siempre",
    "sin",
    "sino",
    "sobre",
    "solo",
    "son",
    "soy",
    "su",
    "sus",
    "tal",
    "también",
    "tan",
    "tanto",
    "te",
    "tener",
    "tenía",
    "tiempo",
    "tiene",
    "tienen",
    "toda",
    "todas",
    "todo",
    "todos",
    "trabajo",
    "tres",
    "tu",
    "un",
    "una",
    "uno",
    "unos",
    "usted",
    "va",
    "vamos",
    "veces",
    "ver",
    "vez",
    "vida",
    "y",
    "ya",
    "yo"]

    conjunto_no_relevantes = new Set(lista_no_relevante);
    var summary = this.text;
    if (summary) { 
        // quick lowercase to normalize per your requirements
        summary = summary.toLowerCase().split(" "); 
        for (var i = summary.length - 1; i >= 0; i--) {
            // might want to remove punctuation, etc. here
            if (summary[i])  {      // make sure there's something
               if (!conjunto_no_relevantes.has(summary[i])){
               emit({"usuario":this.user.screen_name,"palabra":summary[i]}, 1); // store a 1 for each word
                }
           }
        }
    }
};

var reduce = function( key, values ) {    
    var count = 0;    
    values.forEach(function(v) {            
        count +=v;    
    });
    return count;
}

db.getCollection('tweets').mapReduce(map, reduce, {out: "word_count_user"})
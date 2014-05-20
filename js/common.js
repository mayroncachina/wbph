// TODO iniciar a implementacao das estrelas -- prazo 04/05/2014
function matrix(str){
    var data = new Array();
    var DotsIndex = str.indexOf(":"); 
    data["hot"] = str.substr(0,DotsIndex);
    data["id"] = str.substr(DotsIndex+1);
    return data;
}
function sub(url,char){
    var hashtag = url.indexOf(char);
    if(hashtag > 0){
        var hashstring = url.substr(0,hashtag);
        return hashstring;
    }
    else{
        return 0;
    }
}
function getBar(){
    var url = document.URL;
    var hashtag = url.indexOf("#");
    if(hashtag > 0){
        var hashstring = url.substr(hashtag+1);
        return hashstring;
    }
    else{
        return 0;
    }
}

var message = {
    parse:function(strDt){
        var data = new Array();
        var DotsIndex = strDt.indexOf(":");
        console.log(DotsIndex); 
        data["title"] = strDt.substr(0,DotsIndex);
        data["content"] = strDt.substr(DotsIndex+1);
        return data;
    }
}
// http://www.wheresbar.com.br/webservices/bares/
// http://http://192.168.137.1/server/index.php

function setClique(barName){
    var id = bar.get(barName);
    $.ajax({
        type: 'GET',
        url: "http://189.124.190.90:8000/webservices/contagem/"+id+"/",
        dataType: 'text',
        crossDomain: true,
        success: function(data, ts, xhr){
            console.log(data);
            location.href = "profile.html#" + barName;
        }
    });
}

function rpl(string,find,replace){
    while(string.indexOf(find) > 0){
       string = string.replace(find,replace);
    }
    return string;
}
function countMessages(pk){
    var messages = JSON.parse($_SESSION.get("tempMess"));
    var readed = JSON.parse($_SESSION.get("readMessages"));
    var barName = bar.attr(pk,"name");
    var counter = 0;
    for(var i = 0;i<messages.length;i++){
        var messageBarId = messages[i].fields.estabelecimento;
        var text = messages[i].fields.texto;
        if(messageBarId == pk){
            counter++;
        }
    }
    if(readed[barName]){
        if(readed[barName] > counter){
             return counter;
        }
        else{
             return counter - readed[barName];
        }
    }
    else{
         return counter;
    }
}
var bar = {
    _data : localStorage.getItem("ServerData"),
    setData:function(){
        var bars;

        $.ajax({
            type: 'GET',
            url: "http://189.124.190.90:8000/webservices/bares/",
            dataType: 'text',
            crossDomain: true,
            success: function(data, ts, xhr){
                $_SESSION.set("ServerData",data);
                location.href='index.html'; 
            }
        });
    },
    getHot:function(){
        var bars;

        $.ajax({
            type: 'GET',
            url: "http://189.124.190.90:8000/webservices/hot/",
            dataType: 'text',
            crossDomain: true,
            success: function(data, ts, xhr){
               $_SESSION.set("tempHots",data);
            }
        });
    },
    getStar:function(){
        var bars;

        $.ajax({
            type: 'GET',
            url: "http://189.124.190.90:8000/webservices/stars/",
            dataType: 'text',
            crossDomain: true,
            success: function(data, ts, xhr){
                var starX = new Array();
                var stars = JSON.parse(data);
                for(var i=0; i < stars.length; i++){
                    var star = rpl(stars[i],"'",'"');
                    star = rpl(star,"Decimal(\"","");
                    star = rpl(star,"\")","");
                    star = rpl(star,"None","0");
                    var jStar = JSON.parse(star);
                    var med = jStar.stars_num / jStar.stars_click;
                    if(med == NaN){
                        med = 0;
                    }
                    starX[jStar.id] = med;
                }
                 $_SESSION.set("tempStars",JSON.stringify(starX));
                
            }
        });
    },
    countBars:function(){
        $.ajax({
            type: 'GET',
            url: "http://189.124.190.90:8000/webservices/bares/num/",
            dataType: 'text',
            crossDomain: true,
            success: function(data, ts, xhr){
                var num = JSON.parse(data).qtd;
                var NumBares = JSON.parse($_SESSION.get("ServerData")).length;
                if(num != NumBares){
                    bar.setData();
                }
            }
        });
    },
    getMessages:function(){
        var bars;

        $.ajax({
            type: 'GET',
            url: "http://189.124.190.90:8000/webservices/promocoes/",
            dataType: 'text',
            crossDomain: true,
            success: function(data, ts, xhr){
                $_SESSION.set("tempMess",data);
            }
        });
    },
    getPic:function(pk){
        var bars;

        $.ajax({
            type: 'GET',
            url: "http://189.124.190.90:8000/webservices/fotos/"+pk+"/",
            dataType: 'text',
            crossDomain: true,
            success: function(data, ts, xhr){
                $_SESSION.set("photos_"+pk,data);
            }
        });
    },
    setHot:function(pk){
        var bars;

        $.ajax({
            type: 'GET',
            url: "http://189.124.190.90:8000/webservices/hot/"+pk+"/",
            dataType: 'text',
            crossDomain: true,
            success: function(data, ts, xhr){
                console.log("Hoted");
            }
        });
    },
    setStarS:function(pk,val){
        var bars;

        $.ajax({
            type: 'GET',
            url: "http://189.124.190.90:8000/webservices/stars/"+pk+"/"+val+"/",
            dataType: 'text',
            crossDomain: true,
            success: function(data, ts, xhr){
                console.log("Hoted");
            }
        });
    },
    get:function(name){    
        if(localStorage.getItem("ServerData")){
            var bars = JSON.parse(localStorage.getItem("ServerData"));
            for(var i=0; i < bars.length; i++){
                var fields = bars[i].fields;
                var nome = fields.nome;
                if(nome == name){
                    return (bars[i].pk);
                }
            }
        }
    },
    getIndex: function(pk){
        if(localStorage.getItem("ServerData")){
            var bars = JSON.parse(localStorage.getItem("ServerData"));
            for(var i=0; i < bars.length; i++){
                if(bars[i].pk == pk){
                    return i;
                }
            }
        }
    },
    attr:function(id,attribute,noID){
        if(noID){
            id = bar.get(id);
        }
        var bars = JSON.parse(localStorage.getItem("ServerData"));
        id = bar.getIndex(id);
        var field = bars[id].fields;
        switch(attribute){
            case "name": return field.nome;
            case "phones" : return field.telefones;
            case "image" : return field.imagem;
            case "square" : return field.bairro;
            case "hot" : return field.hot;
            case "address" : return field.endereco;
            case "about" : return field.descricao;
            case "music" : return field.musica;
            case "email" : return field.email;
            case "services" : return field.servicos;
            case "calendar" : return field.agenda;
            case "extra" : return field.atendimento;
            case "stars" : return field.stars;
            case "map" : return field.mapa;
        }
    },
    setInfor:function(barx){
        $("#container .info .name .barName").html(bar.attr(barx,"name",true));
        $("#container .info .square").html(bar.attr(barx,"square",true));
    }
}

function setStars(value){
    var otherVal = 0;
    for(var i = 0; i < 5;i++){
        if(value > i && value < i+1){
            $("#container .rate").append('<img onclick="starsSet('+i+')" src="img/icons/Rate%201-5%20Star.png" class="star">');
        }
        else{
            if(value > i){
                $("#container .rate").append('<img onclick="starsSet('+i+')" src="img/icons/Star.png" class="star">');
            }
            else{
                $("#container .rate").append('<img onclick="starsSet('+i+')" src="img/icons/Rate%20Star.png" class="star">');
            }
        }
    }
}
function setPromo(text){
    if(text == ""){
        $("#container .info .promo").html("Não informado");
    }
    else{
        $("#container .info .promo").html(text);
    }
}

function setServ(text){

    if(text == ""){
        $("#container .info .serv").html("Não informado");
    }
    else{
        $("#container .info .serv").html(rpl(text,"\\r\\n","<br>"));
    }

    
}

function setAbout(barx){
    var extra = "<br>Atendimento: " + bar.attr(barx,"extra",true);
    var email = "<br>E-mail: " + bar.attr(barx,"email",true);
    var about = "<hr style='margin-top:10px;'>"+bar.attr(barx,"about",true);
    var street = bar.attr(barx,"address",true);
    var music = bar.attr(barx,"music",true);
    var phone = "<br>Telefone: " + bar.attr(barx,"phones",true);
    if(phone == "<br>Telefone: "){
        phone = "";
    }
    if(extra == "<br>Atendimento: "){
        extra = "";
    }
    if(email == "<br>E-mail: "){
        email = "";
    }
    if(about == "<hr style='margin-top:10px;'>"){
        about = "";
    }
    str = "Endereço: "+ street +"<a id='gmaps'  target='_blank' href=''><img src='img/icons/place.png' height='16px'></a>" + phone + email + extra +"<br>Música: "+ music + rpl(about,"\\r\\n","<br>");
    $("#container .info .about").html(str);
}

$( document ).on( "click", ".show-page-loading-msg", function() {
    var $this = $( this ),
        theme = $this.jqmData( "theme" ) || $.mobile.loader.prototype.options.theme,
        msgText = $this.jqmData( "msgtext" ) || $.mobile.loader.prototype.options.text,
        textVisible = $this.jqmData( "textvisible" ) || $.mobile.loader.prototype.options.textVisible,
        textonly = !!$this.jqmData( "textonly" );
        html = $this.jqmData( "html" ) || "";
    $.mobile.loading( "show", {
            text: msgText,
            textVisible: textVisible,
            theme: theme,
            textonly: textonly,
            html: html
    });
})
$(function(){
    $('aboutLink').attr('class','ui-btn ui-icon-info ui-btn-icon-notext ui-corner-all');
    $('aboutLink').click(function(){
        var backTo = $(this).html();
        location.href = "about.html#" + backTo;
    });
    $('#aboutLink').click(function(){
        var backTo = $(this).attr('BackTo');
        location.href = "about.html#" + backTo;
    });
});

var $_SESSION = {
    set: function(name,value){
        localStorage.setItem(name,value);
    },
    get: function(name){
        var sessionVal = localStorage.getItem(name);
        if(!sessionVal) return false;
        return sessionVal;
    },
    del: function(name){
        localStorage.removeItem(name);
    }
}
function toNumber(str){
    var i = 0;
    var ret = 0;
    for(i = 0;i <= str;i++){
        ret ++;
    }
    return ret;
}
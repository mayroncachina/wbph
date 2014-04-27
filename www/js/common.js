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
        }
    },
    setInfor:function(barx){
        $("#container .info .name").html(bar.attr(barx,"name",true));
        $("#container .info .square").html(bar.attr(barx,"square",true));
    }
}

function setStars(value){
    var otherVal = 0;
    for(var i = 0; i < 5;i++){
        if(value > i && value < i+1){
            $("#container .rate").append('<img src="./img/icons/Rate%201-5%20Star.png" class="star">');
        }
        else{
            if(value > i){
                $("#container .rate").append('<img src="./img/icons/Star.png" class="star">');
            }
            else{
                $("#container .rate").append('<img src="./img/icons/Rate%20Star.png" class="star">');
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
        $("#container .info .serv").html(text);
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
    str = "Endereço: "+ street + phone + email + extra +"<br>Música: "+ music + about;
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
// Server Data reciver
// var $_SERVER = {
//     _server : "http://localhost/Server/index.php",
//     login: function(user,pass){
         
//          var ServerResponse;
//          var contactServer = $.post(this._server, {i:"login", username: user, passwd: pass}, function (data){
//            ServerResponse = data;
//          })
//          .done(function(){
//             $_SESSION.set("loginResponse",ServerResponse);
//          });
//          return contactServer.done(); 
//     }
// }


// WHERE'S BAR FUNCTIONS

function changeTab(TabName){
    var StorageData = $_SESSION.get(TabName);
    var data = JSON.parse(StorageData);
    return data;
}
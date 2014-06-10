function hotList(){
	$("#values").html("");
	var hotsBars = 0;
	var x = new Array();
	var bars = JSON.parse(localStorage.getItem("tempHots"));
	for(var i=0; i < bars.length; i++){
	    var hot = rpl(bars[i],'\'','"');
	    var jHot = JSON.parse(hot);
	    if(jHot.hot > 0){
	        x[i] = jHot.hot + ":" + jHot.id;
	        hotsBars++;
	    }
	}

	x.sort();
	console.log(x);
	if(x.length > 0){
	    for(var i = 0; i < hotsBars; i++){
	        var id = matrix(x[i])['id'];
	        if(i < 4){
	            $("#values").append("<div class='bar' id='%%"+ bar.attr(id,"name") +"'><div class='photo' id='%%"+ bar.attr(id,"name") +"'><div id='"+id+"' class='counter'>"+countMessages(id)+"</div><img id='%%"+ bar.attr(id,"name") +"' class='thumb' src='http://107.170.191.250:8080/static/"+bar.attr(id,"image")+"'></div><span class='name' id='%%"+ bar.attr(id,"name") +"'>"+bar.attr(id,"name")+"</span><br><br><span class='square' id='%%"+ bar.attr(id,"name") +"'>"+bar.attr(id,"square")+"</span><img id='%%"+ bar.attr(id,"name") +"' class='hot' src='img/icons/Hot.png'></div><br class='break'><hr>");
	        }
	        else{
	            var opacity = (1/(hotsBars - 4))* i;
	            $("#values").append("<div class='bar' id='%%"+ bar.attr(id,"name") +"'><div id='%%"+ bar.attr(id,"name") +"' class='photo'><div id='"+id+"' class='counter'>"+countMessages(id)+"</div><img id='%%"+ bar.attr(id,"name") +"' class='thumb' src='http://107.170.191.250:8080/static/"+bar.attr(id,"image")+"'></div><span id='%%"+ bar.attr(id,"name") +"' class='name'>"+bar.attr(id,"name")+"</span><br><br><span id='%%"+ bar.attr(id,"name") +"' class='square'>"+bar.attr(id,"square")+"</span><img class='hot' id='%%"+ bar.attr(id,"name") +"' src='img/icons/Hot2.png' style='opacity:"+opacity+"'></div><br class='break'><hr>");
	        }
	    }
	}
	else{
	    $("#values").append("<span style='position:absolute;top:5px;width:100%;text-align:center;'>Nenhum bar bombando no momento</span>");
	}
}
function listBars(){
	$("#values").html("");
	var bars = JSON.parse(localStorage.getItem("ServerData"));
	var n = new Array();
	for(var i=0; i < bars.length; i++){
		n[i] = bar.attr(bars[i].pk,"name");
	}
	n.sort();
	for(var i = 0; i < n.length; i++){
		var pk = bar.get(n[i]);
		console.log(pk);
		$("#values").append("<div class='bar ' finder='"+pk+"' id='%%"+ bar.attr(pk,"name") +"'><div id='%%"+ bar.attr(pk,"name") +"' class='photo'><div id='"+pk+"' class='counter'>"+countMessages(pk)+"</div><img id='%%"+ bar.attr(pk,"name") +"' class='thumb' src='http://107.170.191.250:8080/static/"+bar.attr(pk,"image")+"'></div><span id='%%"+ bar.attr(pk,"name") +"' class='name'>"+bar.attr(pk,"name")+"</span><br><br><span id='%%"+ bar.attr(pk,"name") +"' class='square'>"+bar.attr(pk,"square")+"</span></div><br id='%%"+ bar.attr(pk,"name") +"' class='break'><hr>"); 
	}
}
var lastBar = "";
$(function(){
	$('body').click(function(event) {    
    	var id = event.target.id;
    	var thisBar = id.substr(2);
    	if(id.indexOf("%%") > -1){
    		if(thisBar != lastBar){
				lastBar = thisBar;
				$("#profileContent").html("<iframe id='profilePage' class='frame' src='profile.html#"+ thisBar +"'></iframe>");
				$.mobile.loading("show");
				var checkPro = setInterval(function(){
					if($_SESSION.get("Profile") == "LOADED"){
						$_SESSION.set("Profile","OPENED");
						$.mobile.loading("hide");
						$.mobile.changePage( $("#profile"), { transition: "none" });
						clearInterval(checkPro);
					}
				},100);
			}
			else{
				$.mobile.changePage( $("#profile"), { transition: "none" });
			}
    	}
	});
	$("#nav .tabAll").click(function(){
		$_SESSION.set("activeTab","allBars");
		listBars();
		myScroll.refresh();
		console.log("all");
	});
	$("#nav .tabHot").click(function(){
		$_SESSION.set("activeTab","Hot");
		hotList();
		myScroll.refresh();
		console.log("hot");
	});
	function open(){
		console.log("open");
	}
	$(document).ready(function(){
		var navWidth = sub($("#nav").css("width"),"px");
		var newWidth = (navWidth/2) - 5.5;
		$("#nav .tabAll").css("width",newWidth+"px");
		$("#nav .tabHot").css("width",newWidth+"px");
		var activeTab = $_SESSION.get("activeTab");
	});
	var sended = false;
	$(function(){
		$("#feedback").bind('submit',function(){
			var message = $('#message').val();
			$("#feedbackForm").html("Enviando...");
			$.ajax({
		        type: 'GET',
		        url: "http://107.170.191.250:8080/webservices/feedback/?name="+ message,
		        dataType: 'text',
		        crossDomain: true,
		        success: function(data, ts, xhr){
		        	sended = true;
		       		$("#feedbackForm").html("Sua mensagem foi enviada<br>Obrigado pela ajuda, vamos nos esforçar para que o erro seja corrigido o mais rápido possível");
		       		setInterval(function(){
						$("#feedbackForm").html("Ouve algum erro ?<br><form id='feedback'><input type='text' id='message'><br><input type='submit' value='envie seu feedback'></form>").trigger('create');
					},12000);
		        }
		    });
			return false;
		});
	});
});

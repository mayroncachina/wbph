
setInterval(function(){

	$.ajax({
	    type: 'GET',
	    url: "http://www.wheresbar.com.br:8080/webservices/push/",
	    dataType: 'JSON',
	    crossDomain: true,
	    success: function(data, ts, xhr){

	    	console.log(data)
	    		
	    	for (var i = 0; i < data.promocoes.length; i++) {
	    		
	    		var mensagem = data.promocoes[i][3] + ": "+data.promocoes[i][1];
				
				console.log(mensagem)

				window.plugin.notification.local.add({
				    id:         data.promocoes[i][0],
				    message:    mensagem,
				    json:       JSON.stringify({ test: 123 })
				});
	
	    	};
	    }
	});

}, 600000);
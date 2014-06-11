
setInterval(function(){

	$.ajax({
	    type: 'GET',
	    url: "http://www.wheresbar.com.br:8080/webservices/push/",
	    dataType: 'text',
	    crossDomain: true,
	    success: function(data, ts, xhr){



	    	for (var i = 0; i < data.promocoes.length; i++) {
	    		alert(a.promocoes[i][1]);
	    		/*
				window.plugin.notification.local.add({
				    id:         1,
				    message:    'I love BlackBerry!',
				    json:       JSON.stringify({ test: 123 })
				});
				*/
	    	};
	/*
			window.plugin.notification.local.add({
			    id:         1,
			    message:    'I love BlackBerry!',
			    json:       JSON.stringify({ test: 123 })
			});
	*/
	    }
	});

}, 5000);
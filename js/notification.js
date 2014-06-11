
setInterval(function(){

	$.ajax({
	    type: 'GET',
	    url: "http://107.170.191.250:8080/webservices/bares/num/",
	    dataType: 'text',
	    crossDomain: true,
	    success: function(data, ts, xhr){
	    	alert(data)
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
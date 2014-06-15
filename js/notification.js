
function initPushwoosh() {
	
    var pushNotification = window.plugins.pushNotification;
    pushNotification.onDeviceReady();
    pushNotification.registerDevice({
            alert: true,
            badge: true,
            pw_appid: "AEE04-46B30",
            appname: "Wheresbar",
            projectid: "870510407514",
            appid: "AEE04-46B30"
        },
        function(status) {
            PPR.info.push_token = status['deviceToken'] || status;
        },
        function(status) {

        }
    );

    if (pushNotification.setApplicationIconBadgeNumber)
        pushNotification.setApplicationIconBadgeNumber(0);

    document.addEventListener('push-notification', function(event) {
        if (pushNotification.setApplicationIconBadgeNumber)
            pushNotification.setApplicationIconBadgeNumber(0);
    });
}



function onBackButton(e) {
    try {
            $.mobile.changePage("#main");
    } catch (e) {
        console.log('[onBackButton] Exception: ' + e);
    }
}


/*
** Local Notification
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
*/

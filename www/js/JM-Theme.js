$(function(){
	$("separator").html("<br><br><br><br>");
	$('.JMScroll').click(function(e){
		e.preventDefault();
		var scrollTo = $(this).attr('href');
		$('html, body').animate({
	 		scrollTop: $(scrollTo).offset().top - 64
	 	},1000);
	});

	$(document).ready(function(){
		$(window).bind('scroll',function(){
			parallaxScroll();
		});
		function parallaxScroll(){
			var scrolledY = $(window).scrollTop();
			$('.parallaxHome').css('background-position','center -'+((scrolledY * 0.3))+'px');
			$('.parallax1').css('background-position','center -'+((scrolledY * 0.5))+'px');
			$('.parallax2').css('background-position','center -'+((scrolledY * 0.5))+'px');
			$('.parallax3').css('background-position','center -'+((scrolledY * 0.15))+'px');
			$('.parallax4').css('background-position','center -'+((scrolledY * 0.1))+'px');
		}
	});

});

function JMwatch(object){
	var alignOnDiv = $("#"+object).attr("JM-alignOnDiv");
	var alignType = $("#"+object).attr("JM-alignType");
	var scroll = $("#"+object).attr("JM-scroll");
	setInterval(function(){
		if(alignType == "center"){
			var divWidth = $('#'+alignOnDiv).width();
			var meWidth = $('#'+object).width();
			var marginleft = (divWidth - meWidth)/2;
			$('#'+object).css("margin-left",marginleft);
		}
		if(alignType == "middle"){
			var divHeight = $('#'+alignOnDiv).height();
			var meHeight = $('#'+object).height();
			var marginTop = (divHeight - meHeight)/2;
			$('#'+object).css("margin-Top",marginTop);
		}
		if(alignType == "center middle" || alignType == "middle center"){
			var divWidth = $('#'+alignOnDiv).width();
			var meWidth = $('#'+object).width();
			var marginleft = (divWidth - meWidth)/2;
			$('#'+object).css("margin-left",marginleft);
			var divHeight = $('#'+alignOnDiv).height();
			var meHeight = $('#'+object).height();
			var marginTop = (divHeight - meHeight)/2;
			$('#'+object).css("margin-Top",marginTop);
		}
	},1000);
}
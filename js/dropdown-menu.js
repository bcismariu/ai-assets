
// dropdown in leftmenu
$(function() {

	$('.dropdown > a').click(function(){
		console.log('clicked');
		if(!$(this).next().is(':visible'))
			$(this).next().slideDown('fast');
		else
			$(this).next().slideUp('fast');	
		return false;
	});

});

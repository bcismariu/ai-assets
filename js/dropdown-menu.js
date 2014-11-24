
// dropdown in leftmenu
$(function() {

	$('.dropdown > a').click(function(){
		aiMenuSlide($(this).next());
		return false;
	});

	// activam in meniu pagina curenta
	var scriptUrl = window.location.origin + window.location.pathname;
	var element = $('a[href="' + scriptUrl + '"]');
	element.parent().addClass('active');
	// verific daca am de a face cu un submeniu care trebuie afisat
	var upperMenu = element.parent().parent().parent();
	if (upperMenu.hasClass('dropdown')) {
		var menus = upperMenu.find('ul');
		$(menus).each(function () {
			aiMenuSlide($(this));
		});
	}
});

function aiMenuSlide(element) {
	if (!element.is(':visible'))
		element.slideDown('fast');
	else
		element.slideUp('fast');
}

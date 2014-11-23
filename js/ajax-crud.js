

 	function ajaxCrudBindButtons() {

		$('a[title="Delete"]').click(function(event) {
			event.preventDefault();
			var id = $(this).parent().parent().data().id;
			$(this).parent().parent().toggleClass('danger');
			$(this).toggleClass('text-danger text-warning');
			$(this).children('span').toggleClass('glyphicon-remove glyphicon-refresh');
			if ($(this).hasClass('text-warning')) {
				$(this).attr('title', 'Cancel');
				var content = '';
				content += '<a class="text-danger" title="Confirm Delete" style="margin-left: 10px;" ';
				content += 'href="javascript: ajaxCrudDelete(\'' + id + '\')">';
				content += '<span class="glyphicon glyphicon-trash"></span></a>';
				$(this).after(content);
			} else {
				$(this).attr('title', 'Delete');
				$(this).next().remove();
			}
		});
		$('a[title="Edit"]').click(function(event) {
			event.preventDefault();
			var id = $(this).parent().parent().data().id;
			$(this).parent().parent().parent().children().removeClass('warning');
			$(this).parent().parent().addClass('warning');
			ajaxCrudEdit(id);
		});
	}

	function ajaxCrudEdit(id) {
		var data = {
			'caller': '_ai_ajax_crud',
			'edit': id
		}
		ajaxCrudPost(data);
	}

	function ajaxCrudDelete(id) {
		var data = {
			'caller': '_ai_ajax_crud',
			'delete' : id
		}
		ajaxCrudPost(data);
	}

	function ajaxCrudPost(data) {
		$.post(location.pathname, data, ajaxCrudCapture);
	}

	function ajaxCrudFillForm(object) {
			//console.log(object);
			// input
			var list = $(ajaxCrudForm).find('input[type="text"], input[type="hidden"], input[type="password"]');
			$.each(list, function (index, input) {
				var field = $(input).attr('name');
				if (typeof(object[field]) != 'undefined') {
					$(input).val(object[field]);
					//console.log(obj[field])
				}
			});

			// checkbox
			var list = $(ajaxCrudForm).find('input[type="checkbox"]');
			$.each(list, function (index, input) {
				var field = $(input).attr('name');
				if (typeof(object[field]) != 'undefined') {
					if (object[field] != 0) {
						$(input).prop('checked', true);
					} else {
						$(input).prop('checked', false);
					}
					
				}
			});

			// textarea
			var list = $(ajaxCrudForm).find('textarea');
			$.each(list, function (index, textarea) {
				var field = $(textarea).attr('name');
				if (typeof(object[field]) != 'undefined') {
					$(textarea).val(object[field]);
				}
			});

			// select
			var list = $(ajaxCrudForm).find('select');
			$.each(list, function (index, select) {
				var field = $(select).attr('name');
				if (typeof(object[field]) != 'undefined') {
					$(select).val(object[field]);
				}
			});
	}

	function ajaxCrudCapture(data) {
		var obj = JSON.parse(data);
		var table = $(ajaxCrudDataTableId).DataTable();
		if (obj._ai_ajax_crud_action == 'edit') {
			$(ajaxCrudForm).show();
			ajaxCrudFillForm(obj);
			$(ajaxCrudForm + ' button[name="_ajax_crud_submit"]').removeClass('btn-success').addClass('btn-info').html('Salveaza');
			return;
		}
		if (obj._ai_ajax_crud_action == 'insert') {
			ajaxCrudFillForm(ajaxCrudFormDefaults);
			$(ajaxCrudForm).hide();
			table.ajax.reload();
			return;
		}
		if (obj._ai_ajax_crud_action == 'updated') {
			ajaxCrudFillForm(ajaxCrudFormDefaults);
			$(ajaxCrudForm).hide();
			table.ajax.reload();
			return;
		}
		
		if (obj._ai_ajax_crud_action == 'delete') {
			table.ajax.reload();
			return;
		}
		
	}

	function ajaxCrudFormGetDefaults(form) {
		// gets the values from a form and puts them into an object
		var object = new Object();
		var defaults = $(form).serializeArray();
		$.each(defaults, function (index, value) {
			object[value['name']] = value['value'];
		});
		return object;
	}

	function ajaxCrudPlaceButtonsOnDataTable() {

		$(document).ready(function() {
 		
			 $(ajaxCrudDataTableId).on('draw.dt', function () {
			 	var th = $(ajaxCrudDataTableId + ' thead').find('th').last();
				th.removeClass('hidden');
				th.html('Actiuni');

			 	var tr = $(ajaxCrudDataTableId + ' tbody').find('tr');
			 	var buttons = '<a href="#" class="text-info" title="Edit"><span class="glyphicon glyphicon-edit"></span></a>';
			 	buttons += '<a href="#" class="text-danger" title="Delete"><span class="glyphicon glyphicon-remove"></span></a>';
			 	$.each(tr, function (index, row) {
			 		var id = $(row).data().id;
			 		var td = $(row).find('td').last();
			 		if (!td.hasClass('dataTables_empty')) {
			 			td.removeClass('hidden');
			 			td.html(buttons);
			 		}
			 	});
			 	
			 	ajaxCrudBindButtons();
			 });

			$('#datatable_corner').html('<button id="_ai_ajax_crud_add_button" type="button" class="btn btn-success"><span class="glyphicon glyphicon-plus"></span></button>');
			$('#_ai_ajax_crud_add_button').click(function () {
				$(ajaxCrudDataTableId).find('tr').removeClass('warning');
				$(ajaxCrudForm + ' button[name="_ajax_crud_submit"]').removeClass('btn-info').addClass('btn-success').html('Adauga');
				$(ajaxCrudForm).show();
				$(ajaxCrudForm)[0].reset();
				ajaxCrudFillForm(ajaxCrudFormDefaults);
			});
		});
	}

		$('a[title="Delete"]').click(function(event) {
			event.preventDefault();
			var id = $(this).parent().parent().attr('data-id');
			$(this).parent().parent().toggleClass('danger');
			$(this).toggleClass('text-danger text-warning');
			$(this).children('span').toggleClass('glyphicon-remove glyphicon-refresh');
			if ($(this).hasClass('text-warning')) {
				$(this).attr('title', 'Cancel');
				var content = '';
				content += '<a class="text-danger" title="Confirm Delete" style="margin-left: 10px;" ';
				content += 'href="' + location.pathname + '?delete=' + encodeURIComponent(id) + '">';
				content += '<span class="glyphicon glyphicon-trash"></span></a>';
				$(this).after(content);
			} else {
				$(this).attr('title', 'Delete');
				$(this).next().remove();
			}
		});
		$('a[title="Edit"]').click(function(event) {
			event.preventDefault();
			var id = $(this).parent().parent().attr('data-id');
			var editUrl = location.pathname + '?edit=' + encodeURIComponent(id);
			window.location.href = editUrl;
		});

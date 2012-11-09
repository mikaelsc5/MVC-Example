define(['underscore','backbone'], function(_, Backbone) {
	var AppRouter = Backbone.Router.extend({
		routes: {
			'authors/:id' : 'showAuthor',
			'*url' : 'default'
		},
		initialize: function(WebApp) {
			console.log('WebApp', WebApp);
			this.WebApp = WebApp;
		},
		showAuthor: function(id) {
			console.log('Router showAuthor', id);
			var self = this;
			var view;
			var model = this.WebApp.collections.Authors.getById(id);
			if (!this.WebApp.views.Author) {
				require(['views/author'], function(AuthorView) {
					view = new AuthorView({'model': model});
					view.on('remove', function(item) {
						console.log('remove event triggered with view', item);
						self.navigate('index', {trigger:true});
					});
					view.render();
					window.WebApp.views.Author = view;
				});
			} else {
				view = window.WebApp.views.Author;
				view.model = model;
				view.render();
			}
		},
		default: function(url) {
			console.log('Router default', url);
			var view;
			var model = this.WebApp.collections.Authors;
			if (!this.WebApp.views.Index) {
				require(['views/index'], function(IndexView) {
					view = new IndexView({'model': model});
					view.render();
					window.WebApp.views.Index = view;
				});
			} else {
				view = window.WebApp.views.Index;
				view.render();
			}
		}
	});
	return AppRouter;
});
define([
	'underscore',
	'backbone',
	'models/author'
], function(_, Backbone, Author) {
	var AuthorsCollection = Backbone.Collection.extend({
		model: Author,
		urlRoot: "/api/v1/authors",
		initialize: function(models) {
			if (_.isUndefined(models)) {
				this.fetch();
			}
		},
		getById: function(id) {
			return this.find(function(item) {
				return item.get('id') === id;
			});
		},
		comparator: function(item) {
			return item.get('id');
		}
	});

	return AuthorsCollection;
});
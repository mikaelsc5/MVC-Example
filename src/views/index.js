define([
	'underscore',
	'backbone',
	'text!templates/index.html'
], function(_, Backbone, IndexTemplate) {
	var IndexView = Backbone.View.extend({
		el: '#container',
		template: _.template(IndexTemplate),
        events: {
            'click button.add' : 'addAuthor'
        },
		initialize: function() {
			_.bindAll(this, 'render');
			console.log('IndexView Initialized!');
			this.model.on('change', this.render);
			this.model.on('destroy', this.render);
		},
        render: function() {
        	console.log('IndexView Render has model', this.model);
        	if (_.isUndefined(this.model)) {
        		// add model or trigger 'I have no model/collection';
        	} else {
	            $(this.el).html(this.template({'authors' : this.model.toJSON()}));
        	}
            return this;
        },
        addAuthor: function() {
            console.log('addAuthor called in IndexView');
            var id = $("#identifier").val();
            var name = $("#author").val();
            var AuthorModel = new this.model.model();
            var validatedModel = AuthorModel.set(
            	{'id':id,'name':name},
            	{'error': function(model, error, opts) {
            		console.log('got error', model, error, opts);
					$('#author').addClass('error');
				}});
            if (validatedModel) {
            	console.log('validatedModel', validatedModel);
	            this.model.add(validatedModel);
	            this.render();
            }
        }
	});
	return IndexView;
});
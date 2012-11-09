define([
    'underscore',
    'backbone',
    'text!templates/author.html'
], function(_, Backbone, AuthorTemplate) {
    var AuthorView = Backbone.View.extend({
        el: '#container',
        template: _.template(AuthorTemplate),
        events: {
            'click button.remove' : 'removeAuthor'
        },
        initialize: function() {
            _.bindAll(this, 'render');
            console.log('AuthorView Initialized!', this.model);
        },
        render: function() {
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        },
        removeAuthor: function() {
            console.log('removeAuthor called in AuthorView');
            this.model.destroy();
            this.trigger('remove', this);
        }
    });

    return AuthorView;
});
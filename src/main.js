requirejs.config({
	paths: {
		backbone: 'lib/backbone-0.9.1.amd.min',
		jquery: 'lib/jquery-1.7.2.min',
		underscore: 'lib/underscore-1.3.1.min',

		// Require.js plugins
		text: 'lib/text'
	}
});

require([
	'backbone',
	'jquery',
	'underscore',
	'router',
	'collections/authors'
], function(Backbone, $, _, Router, AuthorsCollection) {
    var initialLocation = window.location.href.substring(0, window.location.href.indexOf('index'));
	console.log(initialLocation, Backbone, $, _, Router, AuthorsCollection);
	window._ = _;
	window.Backbone = Backbone;
	window.WebApp = {'views': {}, 'collections': {}};
	var authors = [	{'id': '2', 'name': 'Mikael'},
					{'id': '1', 'name': 'Oiva'}];
	window.WebApp.collections.Authors = new AuthorsCollection(authors);
	console.log('Creating Router', window.WebApp);
	window.WebApp.Router = new Router(window.WebApp);
	if (Backbone.history !== null) {
		Backbone.history.start();
	}
    $("body").on("click", "a", function(e) {
        e.preventDefault();
        if($(this).attr("href")) {
            var url = $(this).attr("href").replace(initialLocation, "");
            if(url.match(/^http[s]*:\/\/|ftp:\/\/|mailto:/) || !history.pushState) {
                window.location = url;
            } else if(url != "#" && !url.match(/javascript:/)) {
                WebApp.Router.navigate(url, {trigger: true});
            } 
        }
    });
});
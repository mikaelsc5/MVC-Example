requirejs.config({
  paths:
    jquery: 'ext/jquery'
    underscore: 'ext/underscore'
})

# Change the first 'require' to 'define' if you intend to split your
# application into sub-applications that each first require 'main.js'.
# (A multi-page app instead of a single-page app.) For eaxmple, you
# could have main-shopping-cart.js as an entry point, where you:
# require ['main'], () -> require ['shopping-cart-specific-stuff']
require [
  'jquery',
  'underscore',
  'ext/backbone-optamd3'
], ($, _, Backbone) ->
  window._ = _
  window.Backbone = Backbone

  require [
    'app/module/router/example'
    'domReady'
  ], (ExampleRouter, domReady) ->
    domReady(->
      router = new ExampleRouter()

      if Backbone.history?
        Backbone.history.start()
      @
    )

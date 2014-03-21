window.Singlepager = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {

    this.pages = new Singlepager.Collections.Pages()

    new Singlepager.Routers.Pages({
      $rootEl: $('#content')
    })
    Backbone.history.start()
  }
};

Backbone.CompositeViews = Backbone.View.extend({
  addSubview: function(selector, subview) {
    var selectorSubviews =
      this.subviews()[selector] || (this.subviews()[selector] = [])

    selectorSubviews.push(subview)

    var $selectorEl = this.$(selector)
    $selectorEl.append(subview.$el)
  },



})


$(document).ready(function(){
  Singlepager.initialize();
});

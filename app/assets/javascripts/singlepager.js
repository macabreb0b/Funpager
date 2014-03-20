window.Singlepager = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    alert('starting backbone')
    Singlepager.pages = new Singlepager.Collections.Pages()
    Singlepager.pages.fetch({
      success: function() {
        new Singlepager.Routers.Pages({
          $rootEl: $('#dashboard'),
          collection: Singlepager.pages
        })
        Backbone.history.start()
      }
    })
  }
};

$(document).ready(function(){
  Singlepager.initialize();
});

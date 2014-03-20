window.Singlepager = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {

    Singlepager.pages = new Singlepager.Collections.Pages()
    Singlepager.pages.fetch({
      success: function() {
        new Singlepager.Routers.Pages({
          $rootEl: $('#dashboard')
        })
        Backbone.history.start()
      }
    })
  }
};

$(document).ready(function(){
  Singlepager.initialize();
});

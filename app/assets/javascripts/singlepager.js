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

$(document).ready(function(){


  Singlepager.initialize();
});

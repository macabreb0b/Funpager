Singlepager.Views.PagesIndex = Backbone.View.extend({

  template: JST['pages/index'],

  events: {

  },

  render: function() {
    var renderedContent = this.template({
      pages: this.collection
    })

    this.$el.html(renderedContent)
    this.setTheme()
    return this
  },

  setTheme: function() {
    $('body').css("background-color", "white");
    window.document.title = 'Singlepager'
  }

});

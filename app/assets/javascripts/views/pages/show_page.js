Singlepager.Views.ShowPage = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.model, 'sync', this.render)
    this.listenTo(this.collection, 'sync add', this.render)
  },

  template: JST['pages/show'],

  render: function() {
    var renderedContent = this.template({
      page: this.model,
      widgets: this.collection.sort()
    });
    this.setTheme()
    this.$el.html(renderedContent)

    return this
  },

  setTheme: function() {
    $('body').css("background-color", "black");
    window.document.title = this.model.get('company')
  }

})
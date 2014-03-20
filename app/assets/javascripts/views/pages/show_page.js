Singlepager.Views.ShowPage = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.model, 'sync', this.render)
    this.listenTo(this.collection, 'sync', this.render)
  },

  template: JST['pages/show_page'],

  render: function() {
    var renderedContent = this.template({
      page: this.model,
      widgets: this.collection
    });

    window.document.title = this.model.get('title') // set page title
    this.$el.html(renderedContent)

    return this
  }

})
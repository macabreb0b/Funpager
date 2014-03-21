Singlepager.Views.EditPage = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render)
    $('body').css("background-color", "black");
    window.document.title = this.model.get('company')
  },

  template: JST['pages/edit'],

  render: function() {
    var renderedContent = this.template({
      page: this.model,
      widgets: this.collection.sort()
    })

    this.$el.html(renderedContent)
    return this
  }

})
Singlepager.Views.ShowPage = Backbone.View.extend({
  template: JST['pages/show_page'],

  render: function() {
    var renderedContent = this.template({
      page: this.model
    })
    window.document.title = this.model.get('title') // set page title
    this.$el.html(renderedContent)

    return this
  }

})
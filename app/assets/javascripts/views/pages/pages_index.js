Singlepager.Views.PagesIndex = Backbone.View.extend({

  template: JST['pages/index'],

  render: function() {
    var renderedContent = this.template({
      pages: this.collection
    })

    this.$el.html(renderedContent)
    return this
  }

});

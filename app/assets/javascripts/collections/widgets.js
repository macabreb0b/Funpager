Singlepager.Collections.Widgets = Backbone.Collection.extend({
  url: function() {
    console.log(this.page.url() + "/widgets")
    return this.page.url() + "/widgets"
  },

  model: Singlepager.Models.Widget,

  initialize: function(models, options) {
    this.page = options.page
  }

})
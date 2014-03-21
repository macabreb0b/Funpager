Singlepager.Collections.Widgets = Backbone.Collection.extend({
  url: function() {
    return this.page.url() + "/widgets"
  },

  comparator: function(widget) {
    return widget.get('rank')
  },

  model: Singlepager.Models.Widget,

  initialize: function(models, options) {
    this.page = options.page
  }

})
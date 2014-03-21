Singlepager.Collections.Fields = Backbone.Collection.extend({
  initialize: function(models, options) {
    this.widget = options.widget
  },

  comparator: function(field) {
    return field.id
  },

  url: function() {
    return this.widget.url() + '/fields'
  },

  model: Singlepager.Models.Field

})
/*jshint  browser:  true,
           newcap:   true,
           nomen:    false,
           plusplus: false,
           undef:    false,
           white:    false */
/*global  Singlepager, Backbone */

Singlepager.Collections.Widgets = Backbone.Collection.extend({
  url: function() {
    console.log(this.page.url())
    return this.page.url() + "/widgets";
  },

  comparator: function(widget) {
    return parseFloat(widget.get('rank'), 10);
  },

  model: Singlepager.Models.Widget,

  initialize: function(models, options) {
    this.page = options.page;
  }

});
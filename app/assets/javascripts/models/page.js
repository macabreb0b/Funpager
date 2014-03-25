/*jshint  browser:  true,
           newcap:   true,
           nomen:    false,
           plusplus: false,
           undef:    false,
           white:    false */
/*global  Singlepager, Backbone */

Singlepager.Models.Page = Backbone.Model.extend({
  // urlRoot: '/pages',

  widgets: function() {
    if(!this._widgets) {
      this._widgets = new Singlepager.Collections.Widgets([], {
        page: this
      });
    }
    return this._widgets;
  },

  parse: function(response) {
    console.log('parsing page')
    if(response.widgets) {
      this.widgets().set(response.widgets);
      console.log('got some widgets with ya page')
      console.log(response.widgets)
      delete response.widgets;
    }
    return response;
  }
});

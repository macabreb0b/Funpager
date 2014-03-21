Singlepager.Models.Page = Backbone.Model.extend({
  urlRoot: '/pages',

  widgets: function() {
    if(!this._widgets) {
      this._widgets = new Singlepager.Collections.Widgets([], {
        page: this
      });
    }
    return this._widgets;
  },

  parse: function(response, options) {
    if(response.widgets) {
      this.widgets().set(response.lists);
      delete response.widgets;
    };
    return response;
  }
});

//
// SP.Models.TextW = SP.Models.W.extend({
//   initialize: function () {
//
//   }
// })

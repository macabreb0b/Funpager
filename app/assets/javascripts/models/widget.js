Singlepager.Models.Widget = Backbone.Model.extend({
  initialize: function() {

  },

  fields: function() {
    if(!this._fields){
      this._fields = new Singlepager.Collections.Fields([], {
        widget: this
      })
    }
    return this._fields
  },

  parse: function(response, options) {
    if(response.fields) {
      this.fields().set(response.fields)
      delete response.fields
    }
    return this
  }

})
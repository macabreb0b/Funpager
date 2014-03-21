Singlepager.Models.Widget = Backbone.Model.extend({
  urlRoot: '/widgets',

  fields: function() {
    if(!this._fields){
      this._fields = new Singlepager.Collections.Fields([], {
        widget: this
      })
    }
    return this._fields;
  },

  parse: function(response, options) {
    if(response.fields) {
      this.fields().set(response.fields)
      delete response.fields
    }
    return response
  }

})


Singlepager.Models.TextWidget = Singlepager.Models.Widget.extend({
  initialize: function(){
    this.set({
      name: 'text'
    })
    var titleField = new Singlepager.Models.TitleField()
    var textField = new Singlepager.Models.TextField()
    this.fields().add(titleField)
    this.fields().add(textField)
  }

})
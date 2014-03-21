Singlepager.Models.Field = Backbone.Model.extend({


})

Singlepager.Models.TitleField = Singlepager.Models.Field.extend({
  initialize: function() {
    this.set({
      label: 'Title:',
      content_type: 'text',
      tag: 'h3'
    })
  }
})

Singlepager.Models.TextField = Singlepager.Models.Field.extend({
  initialize: function() {
    this.set({
      label: 'Text:',
      content_type: 'textarea',
      tag: 'p'
    })
  }
})
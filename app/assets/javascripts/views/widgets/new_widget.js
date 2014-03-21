Singlepager.Views.NewWidget = Backbone.View.extend({
  template: JST['widgets/new'],

  initialize: function() {
    this.widget = new Singlepager.Models.TextWidget()
  },

  render: function() {

  }

})
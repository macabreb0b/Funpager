/*jshint  browser:  true,
           newcap:   true,
           nomen:    false,
           plusplus: false,
           undef:    false,
           white:    false */
/*global  Singlepager, Backbone */

Singlepager.Views.NewWidget = Backbone.View.extend({
  template: JST['widgets/new'],

  initialize: function() {
    this.widget = new Singlepager.Models.TextWidget();
  },

  render: function() {

  }

});
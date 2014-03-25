/*jshint  browser:  true,
           newcap:   true,
           nomen:    false,
           plusplus: false,
           undef:    false,
           white:    false */
/*global  Singlepager, Backbone */

Singlepager.Views.ShowPage = Backbone.View.extend({

  template: JST['pages/show'],

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {

    var renderedContent = this.template({
      page: this.model
    });

    this.$el.html(renderedContent);

    return this;
  }


});
/*jshint  browser:  true,
           newcap:   true,
           nomen:    false,
           plusplus: false,
           undef:    false,
           white:    false */
/*global  Singlepager, Backbone */

Singlepager.Views.PagesIndex = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, 'remove', this.render);
  },

  template: JST['pages/index'],

  events: {
    'click .remove': 'removePage'
  },

  render: function() {
    var renderedContent = this.template({
      pages: this.collection
    });

    this.$el.html(renderedContent);
    this.setTheme();
    return this;
  },

  setTheme: function() {
    $('body').removeClass();
    window.document.title = 'Singlepager';
  },

  removePage: function(event) {
    event.preventDefault();
    var id = $(event.currentTarget).data('id');
    var $page = this.collection.get(id);

    $page.destroy();
  }

});
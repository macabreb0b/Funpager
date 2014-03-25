/*jshint  browser:  true,
           newcap:   true,
           nomen:    false,
           plusplus: false,
           undef:    false,
           white:    false */
/*global  Singlepager, Backbone */

Singlepager.Views.ShowPage = Backbone.View.extend({

  template: JST['pages/show'],

  className: 'dashboard',

  events: {
    'click #dashboard': 'dashboard',
    'click #domain': 'domain',
    'click #settings': 'settings',
    'submit #handle': 'newDomain',
    'click .remove': 'removePage'
  },

  domain: function(event) {
    event.preventDefault();

    var $content = $('#dashboard-content')
    var renderedContent = JST['pages/domain_name']({
      page: this.model
    });

    $content.html(renderedContent);
  },

  settings: function(event) {
    event.preventDefault();
    var $content = $('#dashboard-content')

  },

  newDomain: function(event) {
    event.preventDefault();


  },

  dashboard: function(event) {
    event.preventDefault();
    this.render().$el
  },

  render: function() {

    var renderedContent = this.template({
      page: this.model
    });

    this.$el.html(renderedContent);
    // this.$contentEl = $('#dashboard-content')
    return this;
  },

  removePage: function(event) {
    event.preventDefault();

    this.model.destroy();
    Backbone.history.navigate('#/')
  }

});
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
    'submit form': 'editPageInfo',
    'click .remove': 'removePage'
  },

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render)
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
    var renderedContent = JST['pages/settings']({
      page: this.model
    });

    $content.html(renderedContent);
  },

  editPageInfo: function(event) {
    event.preventDefault();

    var $form = $(event.currentTarget);
    var data = $form.serializeJSON();
    console.log(data)
    this.model.save(data)
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
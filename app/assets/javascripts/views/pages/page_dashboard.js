/*jshint  browser:  true,
           newcap:   true,
           nomen:    false,
           plusplus: false,
           undef:    false,
           white:    false */
/*global  Singlepager, Backbone */

Singlepager.Views.PageDashboard = Backbone.View.extend({

  template: JST['pages/dashboard'],

  className: 'dashboard',

  events: {
    'click #dashboard': 'dashboard',
    'click #domain': 'domain',
    'click #settings': 'settings',
    'submit form': 'editPageInfo',
    'click .removeShow': 'removeShow',
    'click .remove': 'removePage'
  },

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render)
  },

  domain: function(event) {
    event.preventDefault();
    $('nav a').removeClass('active')
    $(event.currentTarget).addClass('active')

    var $content = $('#dashboard-content')
    var renderedContent = JST['pages/domain_name']({
      page: this.model
    });

    $content.html(renderedContent);
  },

  settings: function(event) {
    event.preventDefault();
    $('nav a').removeClass('active')
    $(event.currentTarget).addClass('active')

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
    this.setTheme();
    this.$el.html(renderedContent);
    return this;
  },


  setTheme: function() {
    $('body').removeClass();
    $('.navbar-inverse').show();
    jQuery('#viewer').height('auto')
    window.document.title = 'Funpager';
  },

  removeShow: function(event) {
    event.preventDefault();
    $(event.currentTarget).removeClass('removeShow')
    $(event.currentTarget).addClass('remove')
    $(event.currentTarget).addClass('btn-danger')
  },

  removePage: function(event) {
    event.preventDefault();

    this.model.destroy();
    Backbone.history.navigate('#/')
  }

});
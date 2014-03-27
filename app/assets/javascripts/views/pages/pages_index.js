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

  className: 'dashboard',

  render: function() {
    console.log(this.collection)
    var renderedContent = this.template({
      pages: this.collection
    });
    var footer = JST['pages/footer']()
    this.setTheme();
    this.$el.html(renderedContent);
    this.$el.append(footer)

    return this;
  },

  setTheme: function() {
    $('body').removeClass();
    $('html').css('background-color', '#c75832');
    window.document.title = 'Funpager';
    $('#viewer').css('height', 'auto')
    $('.navbar-inverse').show();
  }
});
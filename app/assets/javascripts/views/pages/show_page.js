/*jshint  browser:  true,
           newcap:   true,
           nomen:    false,
           plusplus: false,
           undef:    false,
           white:    false */
/*global  Singlepager, Backbone */

Singlepager.Views.ShowPage = Backbone.CompositeView.extend({
  template: JST['pages/show'],

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.widgets(), 'sync', this.render);
    this.listenTo(this.model.widgets(), 'sync', this.resetWidgets);
    this.listenTo(this.model.widgets(), 'add', this.addWidget);
  },

  addWidget: function(widget) {
    console.log('adding widget');
    var widgetsShowView = new Singlepager.Views.WidgetsShow({
      model: widget
    });

    this.addSubview('.widgets', widgetsShowView);
    widgetsShowView.render();
  },

  removeWidget: function(widget) {
    console.log('removing widget');
    var widgetsShowView = _(this.subviews()['.widgets']).find(function(subview) {
      return subview.model == widget;
    });

    this.removeSubview('.widgets', widgetsShowView);
  },

  resetWidgets: function () {
    console.log('resetting widgets');
    var that = this;
    this.model.widgets().sort().each(function (widget) {
      console.log(widget);
      that.removeWidget(widget);
      that.addWidget(widget);
    });
    this.unBind(); // make sure click-to-edit functionality is turned off
  },

  render: function() {

    var renderedContent = this.template({
      page: this.model
    });

    this.$el.html(renderedContent);
    this.getTheme();

    return this;
  },

  getTheme: function() {
    $('body').addClass(this.model.get('theme'));
    window.document.title = this.model.get('company');
  },

  unBind: function() {
    // $('.widget-fields').on('click', false)
    var $widgets = $('.widget-fields');
    $widgets.removeClass('widget-fields');
    $widgets.addClass('widget-fields-no-hover');
  }

});
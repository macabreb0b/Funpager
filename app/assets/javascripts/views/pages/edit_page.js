/*jshint  browser:  true,
           newcap:   true,
           nomen:    false,
           plusplus: false,
           undef:    false,
           white:    false */
/*global  Singlepager, Backbone */

Singlepager.Views.EditPage = Backbone.CompositeView.extend({
  template: JST['pages/edit'],

  initialize: function() {
    this.listenTo(this.model, 'sync change', this.render);
    this.listenTo(this.model, 'sync change', this.resetWidgets);
    this.listenTo(this.model.widgets(), 'reset sync', this.resetWidgets);
    this.listenTo(this.model.widgets(), 'add', this.addWidget);
    this.listenTo(this.model.widgets(), 'remove', this.removeWidget);
    this.model.widgets().each(this.addWidget.bind(this));
  },

  events: {
    "mouseenter .widgets .widget": 'showAddContent',
    "mouseleave .widgets .widget": 'hideAddContent',
    "click .add-contact-widget": 'newContactWidget',
    "click .add-text-widget": 'newTextWidget',
    "click .add-social-widget": 'newSocialWidget',
    "click .add-services-widget": 'newServicesWidget',
    "click .add-service": 'newService',
    'submit .new': 'submit',
    'click .cancel': 'cancel',
    'click #workstation a': 'setTheme'
  },

  addWidget: function(widget) {
    console.log('adding')
    console.log(widget)
    widget.fields().fetch()
    var widgetsShowView = new Singlepager.Views.WidgetsShow({
      model: widget
    });

    this.addSubview('.widgets', widgetsShowView);
    widgetsShowView.render();
  },

  resetWidgets: function () {
    var that = this;
    this.model.widgets().sort().each(function (widget) {
      that.removeWidget(widget);
      that.addWidget(widget);
    });
  },

  makeSortable: function() {
    $('.widgets').sortable({
      cursor: 'move',
      start: function(event, ui) {
        $(event.currentTarget).find('.add-widget-container').slideToggle(100);
      },
      stop: function(event, ui) {
        var $widget = ui.item;
        $widget.trigger('move');
      }
    });
  },

  removeWidget: function(widget) {
    var widgetsShowView = _(this.subviews()['.widgets']).find(function(subview) {
      return subview.model == widget; // how does this compare the two?
    });

    this.removeSubview('.widgets', widgetsShowView);
  },

  render: function() {
    var renderedContent = this.template({
      page: this.model
    });
    this.$el.html(renderedContent);
    this.getTheme();
    this.makeSortable();
    this.makeResizable();

    return this;
  },

  makeResizable: function() {
    var windowHeight = $(window).height()
    $('#viewer').height(windowHeight - 50 - 100)

    $(window).resize(function() {
      var windowHeight = $(window).height()
      $('#viewer').height(windowHeight - 50 - 100)
    })
  },

  setTheme: function(event) {
    event.preventDefault();
    var $theme = $(event.currentTarget).data('theme')

    this.model.save({ theme: $theme }, {
      success: function(model, response) {
        $('body').removeClass()
        $('body').addClass(model.get('theme'));
      }
    })
  },

  getTheme: function() {
    $('body').removeClass()
    $('body').addClass(this.model.get('theme'));

    var $workspace = $('#workstation')
    $workspace.empty()
    $workspace.append(JST['pages/workstation']())

    window.document.title = this.model.get('company');
  },

  showAddContent: function(event) {
    event.preventDefault();

    $(event.currentTarget).find('.add-widget-container').slideToggle(100);
    $(event.currentTarget).find('.click-to-edit').fadeIn('fast');
  },

  hideAddContent: function(event) {
    event.preventDefault();
    $(event.currentTarget).find('.add-widget-container').slideToggle(100);
    $(event.currentTarget).find('.click-to-edit').fadeOut('fast');
  },

  // showWidgetOptions: function(event) {
  //   event.preventDefault()
  //   $(event.currentTarget).parent().toggle('fast')
  //
  //
  //   $(event.currentTarget).after(JST['widgets/options']())
  // },

  newContactWidget: function (event) {
    event.preventDefault();

    var widget = new Singlepager.Models.ContactWidget();
    var $prevWidget = $(event.currentTarget).parent().parent();
    var rank = this.getRank($prevWidget);
    this.newWidget(widget, $prevWidget, rank);
  },

  newTextWidget: function (event) {
    event.preventDefault();

    var widget = new Singlepager.Models.TextWidget();
    var $prevWidget = $(event.currentTarget).parent().parent();
    var rank = this.getRank($prevWidget);
    this.newWidget(widget, $prevWidget, rank);
  },

  newSocialWidget: function (event) {
    event.preventDefault();

    var widget = new Singlepager.Models.SocialWidget();
    var $prevWidget = $(event.currentTarget).parent().parent();
    var rank = this.getRank($prevWidget);
    this.newWidget(widget, $prevWidget, rank);
  },

  newServicesWidget: function (event) {
    event.preventDefault();

    var widget = new Singlepager.Models.ServicesWidget();
    var $prevWidget = $(event.currentTarget).parent().parent();
    var rank = this.getRank($prevWidget);

    var form = JST['widgets/form_services']({ // use form_services instead of form
      widget: widget,
      newOrEdit: 'new',
      page_id: this.model.id,
      rank: rank
    });

    $prevWidget.after(form);
  },

  newService: function(event) {
    event.preventDefault();
    var $prevField = $(event.currentTarget).prev();
    var prevIndex = $prevField.data('index');
    var fieldIndex = prevIndex + 1;

    var newField = new Singlepager.Models.ServiceField();
    var serviceField = JST['widgets/add_service']({
      field_index: fieldIndex,
      field: newField
    });
    $prevField.after(serviceField);
  },

  getRank: function (prevWidget) {
    var prevId = prevWidget.data('id');
    var prevRank = this.model.widgets().get(prevId).get('rank');
    var nextId = prevWidget.next().data('id');
    var newRank;
    if(nextId) {
      var nextRank = this.model.widgets().get(nextId).get('rank');
      newRank = (prevRank + nextRank) / 2;
    } else {
      newRank = prevRank + 1;
    }
    return newRank;
  },

  newWidget: function(widget, prevWidget, rank) { // replace this with new widget form
    var form = JST['widgets/form']({
      widget: widget,
      newOrEdit: 'new',
      page_id: this.model.id,
      rank: rank
    });

    prevWidget.after(form);
  },

  submit: function(event) {
    event.preventDefault();

    var view = this;
    var params = $(event.currentTarget).serializeJSON();
    var widget = new Singlepager.Models.Widget(params);
    console.log('submitting .new')

    widget.save({}, {
      wait: true,
      success: function(model, response) {
        console.log(model)
        view.model.widgets().add(widget);
        view.$('#newForm').remove();
        view.renderSubviews();
      }
    });
  },

  cancel: function(event) {
    event.preventDefault();
    $(event.currentTarget).parents('li').remove();
  }

});
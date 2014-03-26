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
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model, 'sync ', this.resetWidgets);
    this.listenTo(this.collection, 'reset sync', this.resetWidgets);
    this.listenTo(this.collection, 'add', this.addWidget);
    this.listenTo(this.collection, 'remove', this.removeWidget);

    this.collection.each(this.addWidget.bind(this));
  },

  events: {
    "mouseenter .widgets .widget": 'showAddContent',
    "mouseleave .widgets .widget": 'hideAddContent',
    "click .add-contact-widget": 'newContactWidget',
    "click .add-text-widget": 'newTextWidget',
    "click .add-social-widget": 'newSocialWidget',
    "click .add-services-widget": 'newServicesWidget',
    "click .add-image-widget": 'newImageWidget',
    "click .add-service": 'newService',
    'submit .new': 'submit',
    'click .cancel': 'cancel',
    'click #workstation a': 'setTheme',
    'change .image-input': 'handleFile'
  },

  addWidget: function(widget) {
    var widgetsShowView = new Singlepager.Views.WidgetsShow({
      model: widget
    });

    this.addSubview('.widgets', widgetsShowView);
    widgetsShowView.render();

  },

  resetWidgets: function () {
    var that = this;
    this.collection.sort().each(function (widget) {
      that.removeWidget(widget);
      that.addWidget(widget);
    });
  },

  makeSortable: function() {
    $('.widgets').sortable({
      cursor: 'move',
      start: function(event) {
        // $('.widgets').off()
      },
      stop: function(event, ui) {
        var $widget = ui.item;
        // debugger
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

  newImageWidget: function (event) {
    event.preventDefault();

    var widget = new Singlepager.Models.ImageWidget();
    var $prevWidget = $(event.currentTarget).parent().parent();
    var rank = this.getRank($prevWidget);

    var form = JST['widgets/form_image']({
      widget: widget,
      newOrEdit: 'new',
      page_id: this.model.id,
      rank: rank
    });

    $prevWidget.after(form);
    this.listenToImageInput()
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
    var prevRank = this.collection.get(prevId).get('rank');
    var nextId = prevWidget.next().data('id');
    var newRank;
    if(nextId) {
      var nextRank = this.collection.get(nextId).get('rank');
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

    widget.save({}, {
      wait: true,
      success: function() {
        widget.unset("widget") // why does this come back with 'widget' on it?
        view.collection.add(widget);
        view.$('#newForm').remove();
      }
    });
  },

  submit: function(event) {
    event.preventDefault();

    var view = this;
    // gliphy penguin gif here
    this.$('#newForm').html("<div class='runner' id='_giphy_s73EQWBuDlcas'></div><script>var _giphy = _giphy || []; _giphy.push({id: 's73EQWBuDlcas',w: 500, h: 281});var g = document.createElement('script'); g.type = 'text/javascript'; g.async = true;g.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'giphy.com/static/js/widgets/embed.js';var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(g, s);</script>");
    var params = $(event.currentTarget).serializeJSON();
    var widget = new Singlepager.Models.Widget(params);

    widget.save({}, {
      wait: true,
      success: function() {
        widget.unset("widget") // why does this come back with 'widget' on it?
        view.collection.add(widget);
        view.$('#newForm').remove();
      }
    });
  },

  cancel: function(event) {
    event.preventDefault();
    $(event.currentTarget).parents('li').remove();
  },

  handleFile: function(event) {
    var input = event.target
    var file = input.files[0]

    var reader = new FileReader();
    reader.onload = function(event) {
      $(input).parent().parent().find('.put-image-here').val(this.result)
      // put this into the hidden input
    }

    return reader.readAsDataURL(file)
  },
  //
  // listenToImageInput: function() {
  //   var fileInput = $('.image-input')
  //   fileInput.on('change', this.handleFile)
  // }

});
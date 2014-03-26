/*jshint  browser:  true,
           newcap:   true,
           nomen:    false,
           plusplus: false,
           undef:    false,
           white:    false */
/*global  Singlepager, Backbone */

Singlepager.Views.EditPage = Backbone.CompositeView.extend({
  template: JST['pages/edit'],

  className: 'page-content',

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model, 'sync ', this.resetWidgets);
    this.listenTo(this.collection, 'reset sync', this.resetWidgets);
    this.listenTo(this.collection, 'add', this.addWidget);
    this.listenTo(this.collection, 'remove', this.removeWidget);
    this.listenTo(this.collection, 'sortable', this.makeSortable)

    this.collection.each(this.addWidget.bind(this));
  },

  events: {
    "mouseenter .widgets .widget-fields": 'showEditable',
    "mouseleave .widgets .widget-fields": 'hideEditable',
    "click .add-widget": 'showWidgetOptions',
    "click #newWidget .btn-add-widget": 'newWidget',
    'submit .new': 'submit',
    'click .cancel': 'cancel',
    'click #workstation a': 'setTheme',
    'change .image-input': 'handleFile',
    'startListening': 'listenToJquery',
    'stopListening': 'stopListeningToJquery'
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
        $('.add-widget-container').slideUp(5);
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
    this.makeResizable();
    this.makeSortable();
    this.listenToJquery();
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

  showEditable: function(event) {
    event.preventDefault();
    // this is mouse-over effect
    $(event.currentTarget).find('.click-to-edit').fadeIn('fast');
    $(event.currentTarget).addClass('widget-fields-hover')
  },

  hideEditable: function(event) {
    event.preventDefault();
    // $(event.currentTarget).find('.add-widget-container').slideToggle(100);

    // this is mouse-over effect
    $(event.currentTarget).find('.click-to-edit').fadeOut('fast');
    $(event.currentTarget).removeClass('widget-fields-hover')
  },

  showWidgetOptions: function(event) {
    event.preventDefault()

    // hide all '.add-widget' and keep them hidden until 'cancel' or 'submit'
    this.stopListeningToJquery()
    var $prevWidget = $(event.currentTarget).parent().parent();
    var rank = this.getRank($prevWidget);
    $prevWidget.after(JST['widgets/widget_options']({
      rank: rank
    }))
  },

  newWidget: function(event) {
    event.preventDefault()
    var type = $(event.currentTarget).data('type')
    var widget = this.getWidgetType(type)
    var typeForm = this.getWidgetForm(type)
    var $li = $(event.target).parents('#newWidget')
    var rank = $li.data('rank')

    var form = typeForm({
      widget: widget,
      newOrEdit: 'new',
      page_id: this.model.id,
      rank: rank
    });

    $li.html(form)
  },

  getWidgetType: function(type) {
    switch(type) {
    case 'button':
      return new Singlepager.Models.ButtonWidget();
    case 'social':
      return new Singlepager.Models.SocialWidget();
    case 'text':
      return new Singlepager.Models.TextWidget();
    case 'image':
      return new Singlepager.Models.ImageWidget();
    case 'services':
      return new Singlepager.Models.ServicesWidget();
    case 'contact':
      return new Singlepager.Models.ContactWidget();
    }
  },

  getWidgetForm: function(type) {
    switch(type) {
    case 'image':
      return JST['widgets/form_image'];
    case 'services':
      return JST['widgets/form_services'];
    default:
      return JST['widgets/form'];
    }
  },

  // newService: function(event) {
  //   event.preventDefault();
  //   var $prevField = $(event.currentTarget).prev();
  //   var prevIndex = $prevField.data('index');
  //   var fieldIndex = prevIndex + 1;
  //
  //   var newField = new Singlepager.Models.ServiceField();
  //   var serviceField = JST['widgets/add_service']({
  //     field_index: fieldIndex,
  //     field: newField
  //   });
  //   $prevField.after(serviceField);
  // },

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
        view.$('#newWidget').remove();
      }
    });
  },

  submit: function(event) {
    event.preventDefault();

    var view = this;
    // gliphy penguin gif here
    this.$('#newWidget').html("<div class='runner' id='_giphy_s73EQWBuDlcas'></div><script>var _giphy = _giphy || []; _giphy.push({id: 's73EQWBuDlcas',w: 500, h: 281});var g = document.createElement('script'); g.type = 'text/javascript'; g.async = true;g.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'giphy.com/static/js/widgets/embed.js';var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(g, s);</script>");
    var params = $(event.currentTarget).serializeJSON();
    var widget = new Singlepager.Models.Widget(params);

    widget.save({}, {
      wait: true,
      success: function() {
        widget.unset("widget") // why does this come back with 'widget' on it?
        view.$('#newWidget').remove();
        view.collection.add(widget);
        view.listenToJquery();
      }
    });

  },

  cancel: function(event) {
    alert('clicked cancel (edit)')
    event.preventDefault();
    $(event.currentTarget).parents('li').remove();
    this.listenToJquery();
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

  stopListeningToJquery: function() {
    // don't show the 'add-widget' div on mouseover
    $('.add-widget-container').slideUp(5);
    $('.widgets').off('mouseenter').off('mouseleave')
    $('.widgets').sortable('disable')
  },

  listenToJquery: function() {
    $(function() { // this starts to get called at the opposite time
      $('.widgets').on('mouseenter', '.widget', function(event) {
        $(event.currentTarget).find('.add-widget-container').slideDown(100);
      });
      $('.widgets').on('mouseleave', '.widget', function(event) {
        $(event.currentTarget).find('.add-widget-container').slideUp(100);
      });
      $('.widgets').sortable('enable')
    })
  }

});
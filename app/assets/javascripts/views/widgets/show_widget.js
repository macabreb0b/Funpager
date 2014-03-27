/*jshint  browser:  true,
           newcap:   true,
           nomen:    false,
           plusplus: false,
           undef:    false,
           white:    false */
/*global  Singlepager, Backbone */

Singlepager.Views.WidgetsShow = Backbone.View.extend({
  attributes: function() {
    return {
      'data-id': this.model.get('id'),
      'class': 'widget'
    };
  },

  tagName: 'li',

  template: function() {
    return this.open ? this.widgetFormTemplate.bind(this)() : this.widgetShowTemplate.bind(this)();
  },

  widgetShowTemplate: function() {
    switch(this.model.get('name')) {
      case 'Social':
        return JST['widgets/show_social'];
      case 'Services':
        return JST['widgets/show_services'];
      case 'Image':
        return JST['widgets/show_image'];
      case 'Button':
        return JST['widgets/show_button'];
      default:
        return JST['widgets/show'];
    }
  },

  widgetFormTemplate: function() {
    if(this.model.get('name') === 'Services') {
      return JST['widgets/form_services'];
    } else if(this.model.get('name') === 'Image') {
      return JST['widgets/form_image'];
    } else {
      return JST['widgets/form'];
    }
  },

  addWidgetTemplate: JST["widgets/add_widget"],

  events: {
    'move': 'moveWidget',
    'click .widget-fields': 'beginEditing',
    'click .cancel': 'cancel',
    'submit .edit': 'submit',
    'click .trash': 'destroy'
  },

  initialize: function(){
    this.open = false;
    this.listenTo(this.model, "change", this.render);
  },

  render: function() {
    var renderedContent = this.template()({
      widget: this.model,
      newOrEdit: 'edit',
      page_id: this.model.get('page_id'),
      rank: this.model.get('rank')
    });

    var addWidget = this.addWidgetTemplate({
      id: this.model.id
    });

    this.$el.html(renderedContent);
    this.$el.append(addWidget);

    return this;
  },

  destroy: function(event) {
    event.preventDefault();
    this.model.destroy();
    $('.page-content').trigger('startListening')
  },

  moveWidget: function() {
    var prevId = this.$el.prev().data('id');
    var nextId = this.$el.next().data('id');

    var prevModel = this.model.collection.get(prevId);
    var nextModel = this.model.collection.get(nextId);

    var newRank;
    if(prevModel == null) {
      newRank = nextModel.get('rank') - 1;
    } else if (nextModel == null) {
      newRank = prevModel.get('rank') + 1;
    } else {
      newRank = (prevModel.get('rank') + nextModel.get('rank')) / 2;
    }

    // console.log('old rank ' + this.model.get('rank') + ' new rank ' + newRank);
    this.model.set({ rank: newRank });

    this.model.save()
  },

  beginEditing: function() {
    this.open = true;
    this.render();
    $('.page-content').trigger('stopListening')
  },

  stopEditing: function() {
    this.open = false;

    this.render();
    $('.page-content').trigger('startListening')
  },

  submit: function(event){
    event.preventDefault();

    var view = this;
    var params = $(event.currentTarget).serializeJSON();

    this.model.save(params, {
      wait: true,
      success: function() {
        view.stopEditing();
      }
    });
  },

  cancel: function(event) {

    event.preventDefault();
    this.stopEditing();
  }


});
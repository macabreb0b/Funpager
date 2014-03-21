Singlepager.Views.WidgetsShow = Backbone.View.extend({
  attributes: function() {
    return {
      'data-id': this.model.get('id')
    };
  },

  className: 'widget',

  template: function() {
    return this.open ? JST["widgets/edit"] : JST["widgets/show"];
  },

  events: {
    'move': 'moveWidget'
  },

  initialize: function(options){
    this.open = false;
    this.listenTo(this.model, "change", this.render);
  },

  moveWidget: function() { // make this change the order
    var page
    debugger
    var prevId;
    var nextId;

    var prevModel;
    var nextModel;

    var newRank;

    this.model.save({ rank: newRank })
  },

  render: function() {
    var renderedContent = this.template()({
      widget: this.model
    });

    this.$el.html(renderedContent);

    return this;
  }
})
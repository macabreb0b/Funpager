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

  events: {},

  initialize: function(options){
    this.open = false;
    this.listenTo(this.model, "change", this.render);
  },

  render: function() {
    var renderedContent = this.template()({
      widget: this.model
    });

    this.$el.html(renderedContent);

    return this;
  }
})
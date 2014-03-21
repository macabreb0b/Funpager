Singlepager.Views.WidgetsShow = Backbone.View.extend({
  attributes: function() {
    return {
      'data-id': this.model.get('id'),
      'class': 'widget'
    };
  },

  tagName: 'li',

  template: function() {
    return this.open ? JST["widgets/edit"] : JST["widgets/show"];
  },

  events: {
    'move': 'moveWidget'
  },

  initialize: function(){
    this.open = false;
    this.listenTo(this.model, "change", this.render);
  },

  moveWidget: function(event) { // make this change the order
    var page = Singlepager.Collections.pages.get(this.model.get('page_id'))

    var prevId = this.$el.prev().data('id');
    var nextId = this.$el.next().data('id');

    var prevModel = page.widgets().get(prevId);
    var nextModel = page.widgets().get(nextId);

    var newRank;
    if(prevModel == null) {
      newRank = nextModel.get('rank') - 1;
    } else if (nextModel == null) {
      newRank = prevModel.get('rank') + 1;
    } else {
      newRank = (prevModel.get('rank') + nextModel.get('rank')) / 2;
    }

    this.model.save({ rank: newRank })
  },

  render: function() {
    var renderedContent = this.template()({
      widget: this.model
    });

    this.$el.html(renderedContent)

    return this;
  },

  destroy: function() {
    this.model.destroy()
  }
})
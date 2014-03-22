Singlepager.Views.WidgetsShow = Backbone.View.extend({
  attributes: function() {
    return {
      'data-id': this.model.get('id'),
      'class': 'widget'
    };
  },

  tagName: 'li',

  template: function() {
    return this.open ? JST["widgets/form"] : JST["widgets/show"];
  },

  events: {
    'move': 'moveWidget',
    'click .widget-fields': 'beginEditing',
    'click .cancel': 'stopEditing',
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

    this.$el.html(renderedContent);

    return this;
  },

  destroy: function(event) {
    event.preventDefault()
    this.model.destroy();
  },

  moveWidget: function(event) { // make this change the order
    var page = Singlepager.pages.get(this.model.get('page_id'))

    var prevId = this.$el.prev().data('id');
    var nextId = this.$el.next().data('id');

    var prevModel = page.widgets().get(prevId);
    var nextModel = page.widgets().get(nextId);

    var newRank
    if(prevModel == null) {
      newRank = nextModel.get('rank') - 1;
    } else if (nextModel == null) {
      newRank = prevModel.get('rank') + 1;
    } else {
      newRank = (prevModel.get('rank') + nextModel.get('rank')) / 2;
    }

    console.log('old rank ' + this.model.get('rank') + ' new rank ' + newRank);
    this.model.save({ rank: newRank });
    this.model.collection.fetch()
  },

  beginEditing: function(event) {
    this.open = true;
    this.render()
  },

  stopEditing: function(event) {
    if(event) {
      event.preventDefault()
    }
    this.open = false;
    this.render();
  },


  submit: function(event){
    event.preventDefault()

    var view = this
    var params = $(event.currentTarget).serializeJSON()
    // console.log(params)
    this.model.save(params, {
      wait: true,
      success: function(model) {
        view.stopEditing()
      }
    })


  }


})
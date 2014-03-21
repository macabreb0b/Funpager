Singlepager.Views.ShowPage = Backbone.CompositeView.extend({
  template: JST['pages/show'],

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.widgets(), 'add', this.addWidget);
    this.listenTo(this.model.widgets(), 'remove', this.removeWidget);

    this.model.widgets().sort().each(this.addWidget.bind(this));
  },

  addWidget: function(widget) {
    alert('adding ' + widget.get('rank'))
    var widgetsShowView = new Singlepager.Views.WidgetsShow({
      model: widget
    });

    this.addSubview('.widgets', widgetsShowView);
    widgetsShowView.render();
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

    this.$el.html(renderedContent)
    this.setTheme()

    return this
  },

  setTheme: function() {
    $('body').addClass('carbon')
    window.document.title = this.model.get('company')
  }

})
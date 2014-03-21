Singlepager.Views.EditPage = Backbone.CompositeView.extend({
  template: JST['pages/show'],

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.widgets(), 'add', this.addWidget);
    this.listenTo(this.model.widgets(), 'remove', this.removeWidget);

    this.model.widgets().each(this.addWidget.bind(this));

    // var widgetNewView = new Singlepager.Views.AddWidget({
//       page: this.model
//     });
//     this.addSubview("")
  },

  addWidget: function(widget) {
    var widgetsShowView = new Singlepager.Views.WidgetsShow({
      model: widget
    });

    this.addSubview('.widgets', widgetsShowView);
    widgetsShowView.render();
  },

  makeSortable: function() {
    var that = this;
    $('ul.widgets').sortable();
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
    this.setTheme();
    this.makeSortable();

    return this
  },

  setTheme: function() {
    $('body').css("background-color", "black");
    window.document.title = this.model.get('company')
  },

})
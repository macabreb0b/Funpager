Singlepager.Routers.Pages = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl
  },

  routes: {
    '': 'index',
    'pages/new': 'new',
    'pages/:id': 'show',
    'pages/:id/edit': 'edit'
  },

  edit: function(id) {
    alert('edit page ' + id)
  },

  index: function() {
    var indexView = new Singlepager.Views.PagesIndex({
      collection: Singlepager.pages
    })
    this._swapView(indexView)
  },

  new: function() {


  },

  show: function(id) {
    alert('show page ' + id)
  },

  _swapView: function(view) {
   if(this.current_view) {
     this.current_view.remove()
   }
   this.current_view = view
   this.$rootEl.html(view.render().$el)
  }
});

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
    var page = this._getOrFetch(id)
    var showView = new Singlepager.Views.ShowPage({
      model: page
    })
    this._swapView(showView)
  },

  _swapView: function(newView) {
   if(this.current_view) {
     this.current_view.remove()
   }
   this.$rootEl.html(newView.render().$el)
   this.current_view = newView
  },

  _getOrFetch: function(id) {
    var page = Singlepager.pages.get(id)

    if(page) {
      page.fetch()
      return page
    } else {
      page = new Singlepager.Models.Page({
        id: id
      })
      Singlepager.pages.add(page)
      page.fetch()
      return page
    }
  }
});

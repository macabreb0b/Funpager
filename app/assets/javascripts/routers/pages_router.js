Singlepager.Routers.Pages = Backbone.Router.extend({
  initialize: function(options) {
    this.collection = Singlepager.pages
    this.$rootEl = options.$rootEl
  },

  routes: {
    '': 'index',
    'pages/new': 'new',
    'pages/:id': 'show',
    'pages/:id/edit': 'edit'
  },

  edit: function(id) {
    var that = this
    this.collection.fetch({
      success: function(collection, response, options) {
        var page = collection.getOrFetch(id);
        var widgets = page.widgets();
        widgets.fetch();

        var editView = new Singlepager.Views.EditPage({
          model: page
        });

        that._swapView(editView);
      }
    });
  },

  index: function() {
    var that = this;
    this.collection.fetch({
      success: function(collection, response, options) {
        var indexView = new Singlepager.Views.PagesIndex({
          collection: collection
        })

        that._swapView(indexView)
      }
    })
  },

  new: function() {
    var newPage = new Singlepager.Models.Page()
    var that = this;
    newPage.save({}, {
      success: function(model, response, options) {
        that.collection.add(model)

        var id = model.id
        that.navigate('pages/' + id + '/edit', true)
      }
    });
  },

  show: function(id) {
    var that = this
    this.collection.fetch({
      success: function(collection, response, options) {
        var page = collection.getOrFetch(id)
        var widgets = page.widgets()
        widgets.fetch()

        var showView = new Singlepager.Views.ShowPage({
          model: page
        })

        that._swapView(showView)

      }
    })
  },


    _swapView: function(newView) {
     if(this.current_view) {
       this.current_view.remove()
     }
     this.$rootEl.html(newView.render().$el)
     this.current_view = newView
    },
});

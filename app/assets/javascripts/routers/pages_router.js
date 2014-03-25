/*jshint  browser:  true,
           newcap:   true,
           nomen:    false,
           plusplus: false,
           undef:    false,
           white:    false */
/*global  Singlepager, Backbone */

Singlepager.Routers.Pages = Backbone.Router.extend({
  initialize: function(options) {
    this.collection = Singlepager.pages;
    this.$rootEl = options.$rootEl;
  },

  routes: {
    '': 'index',
    'pages/new': 'newPage',
    'pages/:id': 'dashboard',
    'pages/:id/edit': 'edit'
  },

  edit: function(id) {
    var that = this;
    this.collection.fetch({
      success: function(collection) {
        var page = collection.getOrFetch(id);

        var widgets = page.widgets();
        widgets.fetch()

        var editView = new Singlepager.Views.EditPage({
          model: page,
          collection: widgets
        });

        that._swapView(editView);
      }
    });
  },

  index: function() {
    var that = this;
    this.collection.fetch({
      success: function(collection) {
        var indexView = new Singlepager.Views.PagesIndex({
          collection: collection
        });

        that._swapView(indexView);
      }
    });
  },

  newPage: function() {
    var newPage = new Singlepager.Models.Page();
    var that = this;
    newPage.save({}, {
      success: function(model) {
        that.collection.add(model);

        var id = model.id;
        that.navigate('pages/' + id + '/edit', true);
      }
    });
  },

  dashboard: function(id) {
    var that = this;

    this.collection.fetch({
      success: function(collection) {
        var page = collection.getOrFetch(id);
        // var widgets = page.widgets();
        // widgets.fetch();

        var dashboardView = new Singlepager.Views.PageDashboard({
          model: page
        });

        that._swapView(dashboardView);

      }
    });
  },


    _swapView: function(newView) {
     if(this.current_view) {
       this.current_view.remove();
     }
     this.$rootEl.html(newView.render().$el);
     this.current_view = newView;
    }
});

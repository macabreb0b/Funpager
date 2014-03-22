/*jshint  browser:  true,
           newcap:   true,
           nomen:    false,
           plusplus: false,
           undef:    false,
           white:    false */
/*global  Singlepager, Backbone */

Singlepager.Collections.Pages = Backbone.Collection.extend({
  url: '/pages',

  model: Singlepager.Models.Page,

	getOrFetch: function(id) {
		var model = this.get(id);
		var pages = this;

		if(model){
			model.fetch();
			return model;
		} else {
			model = new Singlepager.Models.Page({ id: id });
			model.fetch({
				success: function() {
          pages.add(model);
        }
			});
			return model;
		}
	}
});
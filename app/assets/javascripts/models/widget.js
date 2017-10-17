/*jshint  browser:  true,
           newcap:   true,
           nomen:    false,
           plusplus: false,
           undef:    false,
           white:    false */
/*global  Singlepager, Backbone */

Singlepager.Models.Widget = Backbone.Model.extend({
  urlRoot: '/widgets', // this has to get called when creating a new widget w/out collection

  fields: function () {
    if (!this._fields) {
      this._fields = new Singlepager.Collections.Fields([], {
        widget: this
      });
    }
    return this._fields;
  },

  parse: function (response) {
    if (response.fields) {
      this.fields().set(response.fields);
      delete response.fields;
    }
    return response;
  }
});


Singlepager.Models.TextWidget = Singlepager.Models.Widget.extend({
  initialize: function() {
    this.set({
      name: 'Text'
    });
    var titleField = new Singlepager.Models.TitleField({
      placeholder: "e.g. About Us"
    });
    var textField = new Singlepager.Models.TextField();
    this.fields().add(titleField);
    this.fields().add(textField);
  }
});

Singlepager.Models.ImageWidget = Singlepager.Models.Widget.extend({
  initialize: function() {
    this.set({
      name: 'Image'
    });
    var titleField = new Singlepager.Models.TitleField({
      placeholder: "e.g. My Newest Painting"
    });
    var descriptionField = new Singlepager.Models.DescriptionField();
    var imageField = new Singlepager.Models.ImageField({
      placeholder: "oh caption, my caption..."
    });
    this.fields().add(titleField);
    this.fields().add(descriptionField);
    this.fields().add(imageField);
  }
});

Singlepager.Models.ButtonWidget = Singlepager.Models.Widget.extend({
  initialize: function() {
    this.set({
      name: 'Button'
    });
    var titleField = new Singlepager.Models.TitleField({
      placeholder: "e.g. Make Payment"
    });
    var urlField = new Singlepager.Models.UrlField({
      label: "URL:",
      placeholder: 'http://'
    });

    this.fields().add(titleField);
    this.fields().add(urlField);
  }
});


/*jshint  browser:  true,
           newcap:   true,
           nomen:    false,
           plusplus: false,
           undef:    false,
           white:    false */
/*global  Singlepager, Backbone */

Singlepager.Models.Field = Backbone.Model.extend({


});

Singlepager.Models.TitleField = Singlepager.Models.Field.extend({
  initialize: function() {
    this.set({
      label: 'Title:',
      content_type: 'text',
      tag: 'h3'
    });
  }
});

Singlepager.Models.TextField = Singlepager.Models.Field.extend({
  initialize: function() {
    this.set({
      label: 'Text:',
      content_type: 'textarea',
      tag: 'p'
    });
  }
});

Singlepager.Models.DescriptionField = Singlepager.Models.Field.extend({
  initialize: function() {
    this.set({
      label: 'Description:',
      content_type: 'textarea',
      tag: 'p'
    });
  }
});

Singlepager.Models.UrlField = Singlepager.Models.Field.extend({
  initialize: function() {
    this.set({
      label: 'Url:',
      content_type: 'text',
      tag: 'a'
    });
  }
});

Singlepager.Models.ImageField = Singlepager.Models.Field.extend({
  initialize: function() {
    this.set({
      label: 'Text:',
      content_type: 'file',
      tag: 'img'
    });
  }
});

Singlepager.Models.TelField = Singlepager.Models.Field.extend({
  initialize: function() {
    this.set({
      label: 'Phone:',
      content_type: 'tel',
      tag: 'p'
    });
  }
});

Singlepager.Models.EmailField = Singlepager.Models.Field.extend({
  initialize: function() {
    this.set({
      label: 'Email:',
      content_type: 'email',
      tag: 'a'
    });
  }
});

Singlepager.Models.AddressAll = Singlepager.Models.Field.extend({
  initialize: function() {
    this.set({
      content_type: 'text',
      tag: 'p'
    });
  }
});

Singlepager.Models.ServiceField = Singlepager.Models.Field.extend({
  initialize: function() {
    this.set({
      label: 'Service:',
      content_type: 'text',
      tag: 'li'
    });
  }
});
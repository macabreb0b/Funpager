/*jshint  browser:  true,
           newcap:   true,
           nomen:    false,
           plusplus: false,
           undef:    false,
           vars:     false,
           white:    false */
/*global  Singlepager, Backbone */

Singlepager.Models.Widget = Backbone.Model.extend({
  urlRoot: '/widgets',

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

Singlepager.Models.ContactWidget = Singlepager.Models.Widget.extend({
  initialize: function() {
    this.set({
      name: 'Contact'
    });
    var titleField = new Singlepager.Models.TitleField({
      content: "Contact Us"
    });
    var descriptionField = new Singlepager.Models.DescriptionField();
    var phoneField = new Singlepager.Models.TelField({
      placeholder: "xxx-xxx-xxxx"
    });
    var emailField = new Singlepager.Models.EmailField({
      placeholder: "you@example.com"
    });
    this.fields().add(titleField);
    this.fields().add(descriptionField);
    this.fields().add(phoneField);
    this.fields().add(emailField);
  }
});

Singlepager.Models.ServicesWidget = Singlepager.Models.Widget.extend({
  initialize: function() {
    this.set({
      name: 'Services'
    });
    var titleField = new Singlepager.Models.TitleField({
      content: 'Our Services'
    });
    var descriptionField = new Singlepager.Models.DescriptionField();
    var serviceField = new Singlepager.Models.ServiceField();
    this.fields().add(titleField);
    this.fields().add(descriptionField);
    this.fields().add(serviceField);
  }
});

Singlepager.Models.SocialWidget = Singlepager.Models.Widget.extend({
  initialize: function() {
    this.set({
      name: 'Social'
    });
    var titleField = new Singlepager.Models.TitleField({
      content: 'Social Media'
    });
    var descriptionField = new Singlepager.Models.DescriptionField();
    var facebookField = new Singlepager.Models.UrlField({
      label: 'Facebook:',
      placeholder: 'http://www.facebook.com/myfacebook'
    });
    var twitterField = new Singlepager.Models.UrlField({
      label: 'Twitter:',
      placeholder: 'http://www.twitter.com/mytwitter'
    });
    var linkedInField = new Singlepager.Models.UrlField({
      label: 'LinkedIn:',
      placeholder: 'http://www.linkedin.com/in/myprofile'
    });
    var tumblrField = new Singlepager.Models.UrlField({
      label: 'Tumblr:',
      placeholder: 'http://myblog.tumblr.com'
     });
    this.fields().add(titleField);
    this.fields().add(descriptionField);
    this.fields().add(facebookField);
    this.fields().add(twitterField);
    this.fields().add(linkedInField);
    this.fields().add(tumblrField);
  }
});



Singlepager.Models.DividerWidget = Singlepager.Models.Widget.extend({
  // allow create() / delete() only
});
/*jshint  browser:  true,
                     newcap:   true,
                     nomen:    false,
                     plusplus: false,
                     undef:    false,
                     white:    false */
/*global  Singlepager, Backbone */

Singlepager.Views.EditPage = Backbone.View.extend({

    showModal: function() {
        if(this.modalShow === true) {
            $('#getting-started-modal').modal('show')
        }
    },

    dontShowModal: function() {
        window.setTimeout(function() {
            $('#getting-started-modal').remove()
        }, 300);
    },

    showLoading: function() {
        jQuery('#newWidget').html('<div id="canvasloader-container" class="wrapper"></div>');

        var cl = new CanvasLoader('canvasloader-container');
        cl.setColor('#F2591D'); // default is '#000000'
        cl.setShape('spiral'); // default is 'oval'
        cl.setDiameter(64); // default is 40
        cl.setDensity(25); // default is 40
        cl.setRange(0.6); // default is 1.3
        cl.setFPS(30); // default is 24
        cl.show(); // Hidden by default
    },




});
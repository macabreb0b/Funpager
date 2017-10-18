/*jshint  browser:  true,
                     newcap:   true,
                     nomen:    false,
                     plusplus: false,
                     undef:    false,
                     white:    false */
/*global  Singlepager, Backbone */

Singlepager.Views.EditPage = Backbone.CompositeView.extend({
    template: JST['pages/edit'],

    className: 'page-content',

    initialize: function() {
        this.listenTo(this.model, 'sync change', this.render);
        this.listenTo(this.model, 'sync change', this.resetWidgets);
        this.listenTo(this.collection, 'reset sync', this.resetWidgets);
        this.listenTo(this.collection, 'add', this.addWidget);
        this.listenTo(this.collection, 'remove', this.removeWidget);

        this.collection.each(this.addWidget.bind(this));
        $('.navbar-inverse').hide();

        this.modalShow = true
    },

    events: {
        "mouseenter .widgets .widget-fields": 'showEditable',
        "mouseleave .widgets .widget-fields": 'hideEditable',
        "click .add-widget": 'showWidgetOptions',
        "click #newWidget .btn-add-widget": 'newWidget',
        'click .add-service': 'newService',
        'submit .new': 'submit',
        'click .cancel': 'cancel',
        'click #workstation a': 'setTheme',
        'change .image-input': 'handleFile',
        'startListening': 'listenToJquery',
        'stopListening': 'stopListeningToJquery',
        'click .done': 'goToDashboard',
    },

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

    addWidget: function(widget) {
        var widgetsShowView = new Singlepager.Views.WidgetsShow({
            model: widget
        });

        this.addSubview('.widgets', widgetsShowView);
        widgetsShowView.render();
    },

    resetWidgets: function () {
        var that = this;
        this.collection.sort().each(function (widget) {
            that.removeWidget(widget);
            that.addWidget(widget);
        });
    },

    makeSortable: function() {
        jQuery('.widgets').sortable({
            cursor: 'move',
            start: function(event) {
                $('.add-widget-container').slideUp(5);
            },
            stop: function(event, ui) {
                var $widget = ui.item;
                $widget.trigger('move');
            }
        });
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
        this.$el.html(renderedContent);
        this.getTheme();
        this.makeResizable();
        this.makeSortable();
        this.listenToJquery();
        return this;
    },

    makeResizable: function() {
        var windowHeight = jQuery(window).height()
        jQuery('#viewer').height(windowHeight - 110)

        jQuery(window).resize(function() {
            var windowHeight = jQuery(window).height()
            jQuery('#viewer').height(windowHeight - 110)
        })
    },


    getTheme: function() {
        jQuery('body').removeClass()
        jQuery('body').addClass(this.model.get('theme'));

        var $workspace = jQuery('#workstation')
        $workspace.empty()
        $workspace.append(JST['pages/workstation']())

        this.showModal()

        window.document.title = this.model.get('company');
    },

    newWidget: function(event) {
        event.preventDefault()
        var type = jQuery(event.currentTarget).data('type')
        var widget = this.getWidgetType(type)
        var typeForm = this.getWidgetForm(type)
        var $li = jQuery(event.target).parents('#newWidget')
        var rank = $li.data('rank')

        var form = typeForm({
            widget: widget,
            newOrEdit: 'new',
            page_id: this.model.id,
            rank: rank
        });

        $li.html(form)
    },

    getWidgetForm: function(type) {
        switch(type) {
        case 'image':
            return JST['widgets/form_image'];
        case 'services':
            return JST['widgets/form_services'];
        default:
            return JST['widgets/form'];
        }
    },


    getRank: function (prevWidget) {
        var prevId = prevWidget.data('id');
        var prevRank = this.collection.get(prevId).get('rank');
        var nextId = prevWidget.next().data('id');
        var newRank;
        if(nextId) {
            var nextRank = this.collection.get(nextId).get('rank');
            newRank = (prevRank + nextRank) / 2;
        } else {
            newRank = prevRank + 1;
        }
        return newRank;
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

    submit: function(event) {
        event.preventDefault();

        var view = this;

        this.showLoading();

        var params = jQuery(event.currentTarget).serializeJSON();
        var widget = new Singlepager.Models.Widget(params);

        widget.save({}, {
            wait: true,
            success: function() {
                widget.unset("widget") // why does this come back with 'widget' on it?
                jQuery('#newWidget').remove();
                view.collection.add(widget);
                view.listenToJquery();
            }
        });
    },

    cancel: function(event) {

        event.preventDefault();
        jQuery(event.currentTarget).parents('li').remove();
        this.listenToJquery();
    },

    handleFile: function(event) {
        var input = event.target
        var file = input.files[0]

        var reader = new FileReader();
        reader.onload = function(event) {
            jQuery(input).parent().parent().find('.put-image-here').val(this.result)
            // put this into the hidden input
        }

        return reader.readAsDataURL(file)
    },

    stopListeningToJquery: function() {
        // don't show the 'add-widget' div on mouseover
        jQuery('.widgets').sortable('disable')

    },

    listenToJquery: function() {
        jQuery('.widgets').on('mouseleave', '.widget', function(event) {
            jQuery(event.currentTarget).find('.add-widget-container').slideUp(100);
        });
        jQuery('.widgets').sortable('enable')
        $('.close-modal').on('click', this.dontShowModal)
    },

    goToDashboard: function(event) {
        event.preventDefault();

        Backbone.history.navigate("#/pages/" + this.model.id)
    }



});
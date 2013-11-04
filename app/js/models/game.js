define(['jquery', 'backbone'], function($, Backbone) {
    $(window).bind({
        keypress: function(e) {
            if ([32,37,38,39,40].indexOf(e.which) > -1)
                e.preventDefault();
            if (e.which == 49)
                BGJ.dispatcher.trigger('level:complete', 1);
            if (e.which == 50)
                BGJ.dispatcher.trigger('level:complete', 2);
            if (e.which == 51)
                BGJ.dispatcher.trigger('level:complete', 3);
        },
        keydown: function(e) {
            if ([32,37,38,39,40].indexOf(e.which) > -1)
                e.preventDefault();
        }
    });
    
    return Backbone.Model.extend({
        defaults: {
            width: 700,
            height: 500,
            bg: 'url("assets/img/starfield.png")'
        }
    });
});

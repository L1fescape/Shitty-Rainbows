define(['jquery', 'backbone'], function($, Backbone) {
    $(window).bind({
        keypress: function(e) {
            if ([37,38,39,40].indexOf(e.which) > -1)
                e.preventDefault();
        },
        keydown: function(e) {
            if ([37,38,39,40].indexOf(e.which) > -1)
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

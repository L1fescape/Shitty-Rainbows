define(['backbone'], function(Backbone) {
    return Backbone.Model.extend({
        defaults: {
            width: 500,
            height: 500,
            bg: '#555'
        }
    });
});

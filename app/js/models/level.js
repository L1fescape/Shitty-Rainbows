define(function() {
    return Backbone.Model.extend({
        initialize: function() {
            console.log("model level", this.get('levelNumber'));
        },
    });
});

define(['backbone'], function(Backbone) {
    return Backbone.Model.extend({
        initialize: function() {
            console.log("model level", this.get('levelNumber'));
        },
        createPoops: function(num, rate, speed, delay) {
            var lastPoop = delay || 0;
            for (var i = 0; i < num; i++) {
                lastPoop += rate;
                setTimeout(function() {
                    var poop = Crafty.e('Poop');
                    poop.movementSpeed = speed;
                }, lastPoop);
            }
        }
    });
});

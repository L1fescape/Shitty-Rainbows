define(['backbone'], function(Backbone) {
    var levels = {
        1: function() {
            this.createPoops(5, 80, 5, 150);
            this.createPoops(10, 100, 3, 300);
        }
    };

    var LevelModel = Backbone.Model.extend({
        initialize: function() {
            console.log("model level", this.get('levelNumber'));
            this.levelCode = levels[this.get('levelNumber')];
        },

        // Required, should be sent in when model is defined.
        levelCode: function() {},

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

    return LevelModel;
});

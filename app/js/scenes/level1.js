define(['backbone'], function(Backbone) {
    function createPoops(num, rate, speed, delay) {
        var lastPoop = delay || 0;
        for (var i = 0; i < num; i++) {
            lastPoop += rate;
            setTimeout(function() {
                var poop = Crafty.e('Poop');
                poop.movementSpeed = speed;
            }, lastPoop);
        }
    }
    return Backbone.View.extend({
        initialize: function() {
            Crafty.scene('Game', function() {
                createPoops(15, 80, 5, 150);
                createPoops(10, 100, 3, 300);

                Crafty.e('Planet');
                Crafty.e('Player');
                Crafty.e('Crosshair');
                var monkeys = Crafty.e('Actor, Image').attr({x: BGJ.GameModel.get('width')/2 - 100, y: 70, z: -1, w: 192, h: 224}).image('assets/img/monkeys.png');

            });
            Crafty.scene('Game');
        }
    });
});

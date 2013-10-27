define(['backbone'], function(Backbone) {
    return Backbone.View.extend({
        initialize: function() {
            Crafty.scene('Game', function() {
                this.model.createPoops(15, 80, 5, 150);
                this.model.createPoops(10, 100, 3, 300);

                var planet = Crafty.e('Planet');
                var turretHead = Crafty.e('Player');
                Crafty.e('Crosshair');
                var monkeys = Crafty.e('Actor, Image').attr({x: BGJ.GameModel.get('width')/2 - 100, y: 70, z: -1, w: 192, h: 224}).image('assets/img/monkeys.png');
                var castle = Crafty.e('Actor, Image');
                    castle.attr({z: turretHead.z - 1, w: 92, h: 140});
                    castle.attr({x: turretHead.x - turretHead.w - 50, y: turretHead.y - (castle.h - turretHead.h)});
                    castle.image('assets/img/castle.png');

            }.bind(this));
            Crafty.scene('Game');
        }
    });
});

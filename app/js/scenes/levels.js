define(['backbone'], function(Backbone) {

    return Backbone.View.extend({

        initialize: function() {
            Crafty.scene('Level', _.bind(function() {
                var planet = Crafty.e('Planet');
                var turretHead = Crafty.e('Player');
                var monkeys = Crafty.e('Actor, Image').attr({x: BGJ.GameModel.get('width')/2 - 100, y: 70, z: -1, w: 192, h: 224}).image('assets/img/monkeys.png');
                var crosshair = Crafty.e('Crosshair');
                var castle = Crafty.e('Actor, Image, Hover');
                castle.attr({z: turretHead.z - 1, w: 92, h: 140});
                castle.attr({x: turretHead.x - turretHead.w - 50, y: turretHead.y - (castle.h - turretHead.h)});
                castle.image('assets/img/castle.png');
                console.log(this.model);
                this.model.levelCode();
            }, this));
            Crafty.scene('Level');
        }

    });
});

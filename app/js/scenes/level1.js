define(['backbone'], function(Backbone) {
    return Backbone.View.extend({
        initialize: function() {
            Crafty.scene('Game', function() {
                this.model.createPoops(15);

                var planet = Crafty.e('Planet');
                var turretHead = Crafty.e('Player');
                var monkeys = Crafty.e('Actor, Image').attr({x: BGJ.GameModel.get('width')/2 - 100, y: 70, z: -1, w: 192, h: 224}).image('assets/img/monkeys.png');
                var castle = Crafty.e('Actor, Image').attr({x: turretHead.x - turretHead.w - 50, y: turretHead.y, z: turretHead.z - 1, w: 92, h: 140}).image('assets/img/castle.png');
                var turretBody = Crafty.e('Actor, Image').attr({x: turretHead.x + 3, y: turretHead.y + turretHead.h - 10, z: turretHead.z - 1, w: 52, h: 88}).image('assets/img/turret-body.png');

            }.bind(this));
            Crafty.scene('Game');
        }
    });
});

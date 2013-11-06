define(['backbone'], function(Backbone) {
    return Backbone.View.extend({
        initialize: function() {
            this.levelNumber = parseInt(this.model.get('levelNumber'));

            Crafty.scene('level1', function() {
                var planet = Crafty.e('Planet');
                var ammo = Crafty.e('Ammo');
                var turretHead = Crafty.e('Turret1').attr({ammo: ammo});
                var monkeys = Crafty.e('Actor, Image, Monkeys').attr({x: BGJ.GameModel.get('width')/2 - 100, y: 70, z: -1, w: 192, h: 224}).image('assets/img/monkeys.png');
                var castle = Crafty.e('Actor, Image').attr({x: turretHead.x - turretHead.w - 50, y: turretHead.y, z: turretHead.z - 1, w: 92, h: 140}).image('assets/img/castle.png');

                this.model.createPoops(5);
            }.bind(this));
            Crafty.scene('level1');
        }
    });
});

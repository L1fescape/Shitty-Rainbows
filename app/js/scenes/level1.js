define(['backbone'], function(Backbone) {
    return Backbone.View.extend({
        initialize: function() {
            this.levelNumber = parseInt(this.model.get('levelNumber'));

            Crafty.scene('level1', function() {
                var planet = Crafty.e('Planet');
                var turretHead = Crafty.e('Turret1');
                var monkeys = Crafty.e('Actor, Image').attr({x: BGJ.GameModel.get('width')/2 - 100, y: 70, z: -1, w: 192, h: 224}).image('assets/img/monkeys.png');
                var castle = Crafty.e('Actor, Image').attr({x: turretHead.x - turretHead.w - 50, y: turretHead.y, z: turretHead.z - 1, w: 92, h: 140}).image('assets/img/castle.png');
                var turretBody = Crafty.e('Actor, Image').attr({x: turretHead.x + 3, y: turretHead.y + turretHead.h - 10, z: turretHead.z - 1, w: 52, h: 88}).image('assets/img/turret-body.png');

                this.model.createPoops(5);
                Crafty.bind('poop:kill', this.killPoop.bind(this));
            }.bind(this));
            Crafty.scene('level1');
        },

        killPoop: function() {
            var poops = this.model.get('poops');
            poops -= 1;
            this.model.set('poops', poops);
            if (poops <= 0 && this.model.madeAllPoops)
                console.log("faggot") //this.levelComplete();
        },

        levelComplete: function() {
            this.model.cleanup();
            Crafty.unbind('poop:kill');
            BGJ.dispatcher.trigger('level:complete', this.levelNumber+1);
        }
    });
});

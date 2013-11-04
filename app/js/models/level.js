define(['backbone', 'utils/random'], function(Backbone, random) {
    return Backbone.Model.extend({
        madeAllPoops: false,
        timeout: 0,
        initialize: function() {
            this.set('poops', 0);
            // bind crafty events
            Crafty.bind('poop:kill', this.killPoop.bind(this));
            // bind global events
            BGJ.dispatcher.on('level:complete', this.cleanup, this);
        },
        createPoops: function(num) {
            var level = this.get('levelNumber')
            var rate = random.get(2,4) * 1000 - level*1000;
            var movementSpeed = level;

            if (num > 0) {
                this.timeout = setTimeout(function() {
                    Crafty.e('Poop').attr('movementSpeed', movementSpeed);
                    this.set('poops', this.get('poops') + 1);
                    this.createPoops(num-1);
                }.bind(this), rate);
            }
            else {
                this.madeAllPoops = true;
            }
        },

        killPoop: function() {
            var poops = this.get('poops');
            poops -= 1;
            this.set('poops', poops);
            if (poops <= 0 && this.madeAllPoops) {
                var nextLevel = this.get('levelNumber') + 1;
                BGJ.dispatcher.trigger('level:complete', nextLevel);
            }
        },

        cleanup: function() {
            // unbind events
            Crafty.unbind('poop:kill');
            // clear all poops
            if (Crafty('Poop').length)
                Crafty('Poop').killPoop();
            this.set('poops', 0);
            // clear timeout for making poops
            clearTimeout(this.timeout);
        }
    });
});

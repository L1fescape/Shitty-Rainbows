define(['backbone', 'utils/random'], function(Backbone, random) {
    return Backbone.Model.extend({
        madeAllPoops: false,
        initialize: function() {
            console.log("model level", this.get('levelNumber'));
            this.set('poops', 0);
        },
        createPoops: function(num) {
            var level = this.get('levelNumber')
            var rate = random.get(2,4) * 1000 - level*1000;
            var speed = level;

            if (num > 0) {
                this.timeout = setTimeout(function() {
                    Crafty.e('Poop').attr('movementSpeed', speed);
                    this.set('poops', this.get('poops') + 1);
                    this.createPoops(num-1);
                }.bind(this), rate);
            }
            else {
                this.madeAllPoops = true;
            }
        },

        cleanup: function() {
            this.set('poops', 0);
            clearTimeout(this.timeout);
        }
    });
});

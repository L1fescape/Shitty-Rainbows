define(['backbone'], function(Backbone) {
    return Backbone.Model.extend({
        createPoops: function(num) {
            var level = this.get('levelNumber')
            var rate = 4000 - level*1000;
            var speed = 1;
            console.log(rate)
            if (num > 0) {
                setTimeout(function() {
                    var poop = Crafty.e('Poop');
                    poop.movementSpeed = speed;
                    this.createPoops(num-1);
                }.bind(this), rate);
            }
        }
    });
});

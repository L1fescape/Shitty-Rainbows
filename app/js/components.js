define(['crafty'], function(Crafty) {

    Crafty.c('Actor', {
        init: function() {
            this.requires('2D, Canvas, Image')
                .attr({x: 50, y: 16, w: 32, h: 32})
                .image('assets/img/example.png');
        }
    });

    Crafty.c('Poop', {
        init: function() {
            this.requires('Actor');
            this.bind('EnterFrame', this.fall);
        },

        fall: function() {
            this.y += 1;
        }
    });

});

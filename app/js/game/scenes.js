define(['crafty'],
function(Crafty) {
    console.log(window);

    Crafty.scene('Loading', function(){

        Crafty.load([

            'assets/img/example.png',
            'assets/img/example2.png'

        ], function() {

            console.log('shit is working');

        }, function(e) {

            console.log(e.loaded);

        })
    });

    Crafty.scene('Game', function() {
        Crafty.e('2D, Canvas, Image, Fourway')
            .attr({x: 16, y: 16, w: 32, h: 32})
            .fourway(4)
            .image('assets/img/example.png');
    });
});

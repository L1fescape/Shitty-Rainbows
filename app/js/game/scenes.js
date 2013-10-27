define(['underscore', 'crafty', 'models/levels'],
function(_, Crafty, Levels) {

    Crafty.scene('Loading', function(){

        Crafty.load([

            'assets/img/example.png',
            'assets/img/example2.png'

        ], function() {

            Crafty.scene('Game');

        }, function(e) {

            console.log(e.loaded);

        })
    });

    Crafty.scene('Game', function() {
        createPoops(15, 80, 5, 150);
        createPoops(10, 100, 3, 300);

        Crafty.e('Crosshair');
        Crafty.e('Player');

    });
});

function createPoops(num, rate, speed, delay) {
    var lastPoop = delay || 0;
    for (var i = 0; i < num; i++) {
        lastPoop += rate;
        setTimeout(function() {
            var poop = Crafty.e('Poop');
            poop.movementSpeed = speed;
        }, lastPoop);
    }
}

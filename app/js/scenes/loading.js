define(['crafty', 'components'], function(Crafty, Components) {
return function(levelStart) {
    levelStart = levelStart || null;
    new Components();
    Crafty.load([
        'assets/img/example.png',
        'assets/img/example2.png',
        'assets/img/monkeys.png',
        'assets/img/planet.png'
    ], function() {
        BGJ.dispatcher.trigger('game:loaded');
        BGJ.dispatcher.trigger('game:start', levelStart);
    }, function(e) {
        console.log(e.percent);
    })
}
});

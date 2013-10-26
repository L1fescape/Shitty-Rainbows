define(['crafty', 'components'], function(Crafty) {
return function(levelStart) {
    levelStart = levelStart || null;
    Crafty.load([
        'assets/img/example.png',
        'assets/img/example2.png'
    ], function() {
        BGJ.dispatcher.trigger('game:loaded');
        BGJ.dispatcher.trigger('game:start', levelStart);
    }, function(e) {
        console.log(e);
    })
}
});

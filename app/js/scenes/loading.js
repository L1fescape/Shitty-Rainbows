define(['crafty', 'components'], function(Crafty, Components) {
    return function(levelStart) {
        levelStart = levelStart || null;

        Crafty.load([
            'assets/img/poop-1.png',
            'assets/img/poop-2.png',
            'assets/img/poop-3.png',
            'assets/img/poop-4.png',
            'assets/img/poop-splosion-64.png',

            'assets/img/castle.png',
            'assets/img/turret-body.png',
            'assets/img/turret-head.png',
            'assets/img/turret.png',

            'assets/img/monkeys.png',
            'assets/img/planet.png'
        ], function() {
            new Components();
            BGJ.dispatcher.trigger('game:loaded');
            BGJ.dispatcher.trigger('game:start', levelStart);
        }, function(e) {
            console.log(e.percent);
        });
    }
});

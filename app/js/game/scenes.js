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
        var lvl1 = new Levels.level1();

        this.levelLoader = this.bind('EnterFrame', _.bind(function () {
            //Need to compensate for window blurring.
            var num = Math.floor(Date.now()/1000) - lvl1.get('start');
            var marks = lvl1.get('secondMark');
            if (marks[num]) {
                marks[num]();
                marks[num] = null;
                lvl1.set('secondMark', marks);
            }

            if (num > lvl1.get('length')) {
                this.unbind('EnterFrame', this.levelLoader);
            }
        }, this));

    });
});

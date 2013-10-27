define(['backbone','game/components'], function(Backbone) {
    var Level = Backbone.Model.extend({
        defaults: {
            start: Math.floor(Date.now()/1000),
            length: 90,
            secondMark: {
                1: function () {
                    console.log('Level Started');
                },
                2: function () {
                    console.log('Is this out of order?');
                }
            }
        },

        initialize: function() {
            var marks = this.setMarks(this.get('secondMark'));
            this.set('secondMark', marks);
        },

        //Overwritten when you make a new level
        setMarks: function(marks) {}
    });

    return {
        level1: Level.extend({
            setMarks: function(marks) {
                marks[1] = function () {
                    console.log('Testing a little level 2 action');
                    Crafty.e('Poop').attr({x: -50, y: -50});
                    Crafty.e('Poop').attr({x: 1, y: -50});
                    Crafty.e('Poop').attr({x: 50, y: -30});
                    Crafty.e('Poop').attr({x: 440, y: -60});
                    Crafty.e('Poop').attr({x: 520, y: -60});
                };
                marks[2] = _.bind(function () {
                    Crafty.e('Poop').attr({x: 100, y: -60});
                    Crafty.e('Poop').attr({x: 150, y: -60});
                    Crafty.e('Poop').attr({x: 200, y: -60});
                    Crafty.e('Poop').attr({x: 320, y: -60});
                    Crafty.e('Poop').attr({x: 370, y: -60});
                    Crafty.e('Poop').attr({x: 470, y: -60});
                }, this);
                marks[3] = _.bind(function () {
                    Crafty.e('Poop').attr({x: 170, y: -60});
                    Crafty.e('Poop').attr({x: 130, y: -78});
                    Crafty.e('Poop').attr({x: 190, y: -60});
                    Crafty.e('Poop').attr({x: 379, y: -60});
                    Crafty.e('Poop').attr({x: 200, y: -56});
                    Crafty.e('Poop').attr({x: 478, y: -37});
                }, this);
                return marks;
            }
        })
    };

});


//console.log(Level2.secondMark[6]);

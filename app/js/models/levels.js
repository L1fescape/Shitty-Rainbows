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

    var Levels = {
        level1: Level.extend({
            setMarks: function(marks) {
                marks[6] = function () {
                    console.log('Testing a little level 2 action');
                    Crafty.e('Poop');
                };
                marks[2] = _.bind(function () {
                    console.log('Overwriting a level action');
                }, this);
                return marks;
            }
        })
    };

    return Levels;

});


//console.log(Level2.secondMark[6]);

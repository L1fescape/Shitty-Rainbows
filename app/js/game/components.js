define(['crafty', 'models/game', 'game/components'], function(Crafty, Game) {

    Crafty.c('Actor', {
        init: function() {
            this.requires('2D, Canvas, Image')
                .image('assets/img/example.png');
        }
    });

    Crafty.c('Poop', {

        w: 32,
        h: 32,
        movementSpeed: 5,

        init: function() {
            var game = new Game();
            this.requires('Actor, Collision');
            this.attr({
                x: Math.random()*game.get('width'),
                y: -(Math.random()*game.get('height')/10)
            });

            this.bind('EnterFrame', this.fall);
            this.onHit('Player', this.destroy);
            this.onHit('Bullet', this.destroy);
        },

        fall: function() {

            // start inside player
            var xplayer = this.x + this.w/2;
            var yplayer = this.y + this.h/2;
            var xtarget = Crafty('Player').x + Crafty('Player').w/2;
            var ytarget = Crafty('Player').y + Crafty('Player').h/2;
            // get slope
            var angleRadian = Math.atan2(ytarget - yplayer, xtarget - xplayer);
            // calculate x and y directions
            var ydir = Math.sin(angleRadian);
            var xdir = Math.cos(angleRadian);

            this.x += xdir * this.movementSpeed;
            this.y += ydir * this.movementSpeed;

            if (this.y > ytarget) {
                this.destroy();
            }

        }
    });

    Crafty.c('Player', {

        w:  32,
        h: 32,
        z: 5,
        bullets: [],
        bulletRate: 5,
        lastTimeFired: 0,
        lastColor: 0,
        colors: ['#ff0000', '#ff00cc', '#8800ff', '#0099ff', '#00ff66', '#e1ff00', '#ffa200', '#ff1500'],

        init: function() {
            var game = new Game();
            this.requires('Actor, Collision, Keyboard')
                .attr({x: game.get('width')/2 - this.w/2, y: game.get('width')/2 - this.y/2, z: 5})
                .image('assets/img/example2.png');
            this.onHit('Poop', this.takeDamage);
            this.bind('EnterFrame', function(ev){
                if (this.isDown('SPACE')) {
                    var curSeconds = (new Date).getTime();
                    if (curSeconds - this.lastTimeFired > this.bulletRate) {
                        this.lastTimeFired = curSeconds;
                        // start inside player
                        var xplayer = this.x + this.w/2;
                        var yplayer = this.y + this.h/2;
                        var xmouse = Crafty('Crosshair').x;
                        var ymouse = Crafty('Crosshair').y;
                        // get slope
                        var angleRadian = Math.atan2(ymouse - yplayer, xmouse - xplayer);
                        // calculate x and y directions
                        var ydir = Math.sin(angleRadian);
                        var xdir = Math.cos(angleRadian);
                        console.log(ydir, xdir);
                        // bullet rotation
                        var rotation = angleRadian * 180 / Math.PI;
                        Crafty.e('Bullet').attr({x : xplayer, y : yplayer, xdir : xdir, ydir : ydir, rotation : rotation}).color(this.colors[this.lastColor]);
                        this.lastColor++;
                        if (this.lastColor === this.colors.length - 1) {
                            this.lastColor = 0;
                        }
                    }
                }
            });
        },

        takeDamage: function(ev) {
            console.log(ev);
        }
    });

    Crafty.c('Bullet', {
        w: 15,
        h: 15,

        init: function() {
            this.requires('Actor, Color, Collision');
            this.attr({z: 1});
            this.bind('EnterFrame', function() {
                this.x += this.xdir * 5
                this.y += this.ydir * 5

                if (this.y < 0) {
                    this.destroy();
                }
            });
        }
    });

    Crafty.c('Crosshair', {
        w: 15,
        h: 15,

        init: function() {
            var game = new Game();
            this.requires('Actor, Color, Fourway').attr({x: 100, y: 100}).fourway(7).color('#ffc');
            this.bind('Moved', function() {
                if (this.x > game.get('width') - this.w ||
                    this.y > game.get('height') - this.h||
                    this.x < 0 ||
                    this.y < 0) {
                    this._speed = 0;
                    if (this._movement) {
                        this.x -= this._movement.x;
                        this.y -= this._movement.y;
                    }
                }
            })
        }
    })
});
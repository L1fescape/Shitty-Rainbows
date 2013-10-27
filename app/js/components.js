define(function() {
    return function() {
        var game = BGJ.GameModel;

        Crafty.c('Actor', {
            init: function() {
                this.requires('2D, Canvas');
            }
        });

        Crafty.c('Poop', {
            w: 32,
            h: 32,
            movementSpeed: 5,
            init: function() {
                this.requires('Actor, Image, Collision');
                this.attr({
                    x: Math.random()*game.get('width'),
                    y: -(Math.random()*game.get('height')/10)
                });
                this.image('assets/img/example.png');

                this.angle = -(Math.random()*180);

                this.bind('EnterFrame', this.fall);
                this.onHit('Player', this.destroy);
                this.onHit('Bullet', this.destroy);
                this.onHit('Planet', this.destroy);
            },

            fall: function() {

                var thisX = this.x + this.w/2;
                var thisY = this.y + this.h/2;


                var planetRadius = game.get('height')/2;

                var planetX = game.get('width')/2;
                var planetY = Crafty('Planet').y + planetRadius + Crafty('Planet').collisionOffset;

                var angle = this.angle;

                var targetX = planetX + planetRadius * Math.cos(angle * Math.PI / 180.0);
                var targetY = planetY + planetRadius * Math.sin(angle * Math.PI / 180.0);

                var angleRadian = Math.atan2(targetY - thisY, targetX - thisX);

                var ydir = Math.sin(angleRadian);
                var xdir = Math.cos(angleRadian);

                this.x += xdir * this.movementSpeed;
                this.y += ydir * this.movementSpeed;

                if (this.y >= targetY) {
                    this.destroy();
                }

            }
        });

        Crafty.c('Player', {

            bullets: [],
            bulletRate: 5,
            lastTimeFired: 0,
            lastColor: 0,
            colors: ['#ff0000', '#ff1500', '#ff00cc', '#ff00b7', '#8800ff', '#6600ff', '#0099ff', '#00ccff', '#00ff66', '#00ff00', '#e1ff00', '#ffff00', '#ffa200', 'f77f00'],

            init: function() {
                this.requires('Actor, Image, Collision, Keyboard')
                    .attr({w: 56, h: 62, z: 5})
                    .attr({x: Crafty('Planet').x + Crafty('Planet').w/2 - this.w/2, y: Crafty('Planet').y - this.y/2})
                    .image('assets/img/turret-head.png');
                this.origin('bottom center');
                this.onHit('Poop', this.takeDamage);
                this.bind('EnterFrame', function(ev){
                    if (this.isDown('SPACE')) {
                        var curSeconds = (new Date).getTime();
                        if (curSeconds - this.lastTimeFired > this.bulletRate) {
                            this.lastTimeFired = curSeconds;

                            var xplayer = this.x + this.w/2;
                            var yplayer = this.y + this.h/2;
                            var xmouse = Crafty('Crosshair').x;
                            var ymouse = Crafty('Crosshair').y;

                            var angleRadian = Math.atan2(ymouse - yplayer, xmouse - xplayer);

                            var ydir = Math.sin(angleRadian);
                            var xdir = Math.cos(angleRadian);

                            var rotation = angleRadian * 180 / Math.PI;
                            this.rotation = rotation + 90;
                            Crafty.e('Bullet')
                                .attr({x : xplayer - this.w/4, y : yplayer, xdir : xdir, ydir : ydir, rotation : rotation})
                                .color(this.colors[this.lastColor]);

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
            bulletspeed: 5,

            init: function() {
                this.requires('Actor, Color, Collision');
                this.attr({z: 1, w: 16, h: 16});
                this.origin('center');
                this.bind('EnterFrame', function() {
                    this.x += this.xdir * this.bulletspeed;
                    this.y += this.ydir * this.bulletspeed;

                    if (this.y < 0) {
                        this.destroy();
                    }
                });
            }
        });

        Crafty.c('Crosshair', {
            init: function() {
                this.requires('Actor, Color, Fourway, Collision, WiredHitBox')
                    .attr({x: Crafty('Player').x, y: 100, z: 3, w: 15, h: 15})
                    .fourway(7)
                    .color('#ffc');
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
        });

        Crafty.c('Planet', {
            collisionOffset: 50,
            init: function() {

                this.requires('2D, Canvas, Image')
                    .image('assets/img/planet.png');

                var centerX = game.get('width')/2;
                var centerY = game.get('height') + 100;
                var circleRadius = game.get('height')/2;

                this.attr({w: game.get('width'),
                    h: game.get('height'),
                    z: 4,
                    x: 0,
                    y: centerY - circleRadius - this.collisionOffset
                });

                this.requires('Collision')
                    .collision([0, this.collisionOffset],[0, this.h],[this.w, this.h],[this.w, this.collisionOffset]);

            }

        });
    }
});

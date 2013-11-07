define(function() {
    return function() {
        var game = BGJ.GameModel;

        Crafty.sprite(64, 'assets/img/poop-splosion-64.png', {
            splosion: [0,0]
        });

        Crafty.c('Splosion', {
            init: function() {
                this.requires('Actor, splosion, SpriteAnimation');
                this.animate('Splode', 0, 0, 4);
                this.animate('Splode', 15, 0);
                this.bind('EnterFrame', function() {
                    if (this._currentReelId !== 'Splode') {
                        this.destroy();
                    }
                });
            }
        });

        Crafty.c('Actor', {
            init: function() {
                this.requires('2D, Canvas');
            }
        });

        Crafty.c('Buzz', {
            buzzLastAngle: 0,
            buzzHoverIncrement: 2,
            buzzHoverRadius: .9,
            buzzOriginX: null,
            buzzRadius: 3,
            init: function() {
                this.bind('EnterFrame', this.buzz)
            },

            buzz: function() {
                this.y -= Math.cos(this.buzzLastAngle * this.buzzRadius * Math.PI / 180.0) * this.buzzHoverRadius;
                this.x -= Math.sin(this.buzzLastAngle * Math.PI / 180.0) * this.buzzHoverRadius;
                this.buzzLastAngle += this.buzzHoverIncrement;

                if (!this.buzzOriginX) {
                    this.buzzOriginX = this.x;
                }
            }
        });

        Crafty.c('Traj', {
            trajLastAngle: 0,
            trajHoverIncrement: 2,
            trajHoverRadius: .9,
            trajOriginX: null,
            trajSpeed: 1.5,
            gravitySpeed: 2,
            maxYSpeed: 0,
            reachedMax: false,
            init: function() {
                this.scaleImage = true;
                this.imgScaleW = this.w;
                this.imgScaleH = this.h;
                this.bind('EnterFrame', this.traj)
            },

            traj: function() {

                this.imgScaleW++;
                this.imgScaleH++;
                this.w++;
                this.h++;

                this.collision([0,0], [0, this.w], [this.h, this.w], [this.h, 0]);

                if (!this.lastY) {
                    this.lastY = this.y;
                }

                if (!this.trajOriginX) {
                    this.trajOriginX = this.x;
                }

                var ySpeedDelta = this.y - this.lastY;
                var speedDelta = Math.cos(this.trajLastAngle * Math.PI / 180.0) * this.trajHoverRadius * this.trajSpeed;

                if (this.trajLastAngle > 180) {

                    if (this.maxYSpeed <= ySpeedDelta) {
                        this.maxYSpeed = ySpeedDelta;
                    } else {
                        this.reachedMax = true;
                    }

                    if (this.reachedMax) {
                        console.log(this.maxYSpeed);
                        this.y -= this.maxYSpeed;
                    } else {
                        this.y -= speedDelta;
                    }

                } else {
                    this.trajLastAngle += this.trajHoverIncrement;
                    this.lastY = this.y;
                    this.y -= speedDelta;
                }

            }
        });

        Crafty.c('Poop', {
            w: 32,
            h: 32,
            movementSpeed: 5,
            init: function() {
                this.requires('Actor, Image, Traj, Collision');

                var image;

                switch (Math.ceil(Math.random()*4)) {
                    case 1:
                        image = 'assets/img/poop-1.png';
                        break;
                    case 2:
                        image = 'assets/img/poop-2.png';
                        break;
                    case 3:
                        image = 'assets/img/poop-3.png';
                        break;
                    case 4:
                        image = 'assets/img/poop-4.png';
                        break;
                    default:
                }

                this.image(image);
                this.attr({x: Crafty('Monkeys').x + Math.random()*Crafty('Monkeys').w, y: Crafty('Monkeys').y, w: 32, h: 32});

                this.angle = -(Math.random()*180);

                BGJ.dispatcher.trigger('poop:create');
                this.bind('EnterFrame', this.fall);
                this.onHit('BaseTurret', this.killPoop);
                this.onHit('Bullet', this.killPoop);
                this.onHit('Planet', this.killPoop);
            },

            killPoop: function() {
                BGJ.dispatcher.trigger('poop:kill');
                Crafty.e('Splosion').attr({x: this.x, y: this.y});
                this.destroy();
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

                var rotation = angleRadian * 180 / Math.PI;

                var xdir = Math.cos(angleRadian);

                this.x += xdir * this.movementSpeed;
                this.rotation = rotation - 90;

                if (this.y >= targetY) {
                    this.killPoop();
                }

            }
        });

        Crafty.c('BaseTurret', {
            fireRate: 10, // number of times to fire per second
            bulletBurst: 1, // number of bullets to fire per shot
            spread: 0.2, // area of bullet spread
            rotate: true, // whether or not the turret head should rotate
            movementSpeed: 5, // how fast the turret should rotate
            bulletOrigin: "top",
            lastTimeFired: 0,
            lastColor: 0,
            turretRotation: 0,
            colors: ['#ff0000', '#ff1500', '#ff00cc', '#ff00b7', '#8800ff', '#6600ff', '#0099ff', '#00ccff', '#00ff66', '#00ff00', '#e1ff00', '#ffff00', '#ffa200', 'f77f00'],

            init: function() {
                this.requires('Actor, Image, Collision, Keyboard')
                    .attr({w: 52, h: 114, z: 5})
                    .attr({x: Crafty('Planet').x + Crafty('Planet').w/2 - this.w/2, y: Crafty('Planet').y - this.y/2})
                // create turret head
                this.image('assets/img/turret-head.png')
                // create turret body
                Crafty.e('Actor, Image').attr({x: this.x + 3, y: this.y + this.h - 10, z: this.z - 1, w: 52, h: 88}).image('assets/img/turret-body.png');
                this.origin('bottom center');
                this.onHit('Poop', this.takeDamage);
                this.bind('EnterFrame', function(ev){
                    if (this.isDown('A') && this.turretRotation > -90 ) {
                        this.turretRotation -= this.movementSpeed;
                    }
                    if (this.isDown('D') && this.turretRotation < 90) {
                        this.turretRotation += this.movementSpeed;
                    }
                    if (this.rotate)
                      this.rotation = this.turretRotation;
                    if (this.isDown('SPACE')) {
                        var curSeconds = Date.now();
                        if (curSeconds - this.lastTimeFired > 1000/this.fireRate) {
                            this.fire();
                            this.lastTimeFired = curSeconds;
                            this.lastColor++;
                            if (this.lastColor === this.colors.length - 1) {
                                this.lastColor = 0;
                            }
                        }
                    }
                });
            },

            fire: function() {
                var rotation = this.turretRotation - 90;
                var angleRadian = rotation * (Math.PI/180);

                var ydir = Math.sin(angleRadian);
                var xdir = Math.cos(angleRadian);

                var xpos = this.x + 20;
                var ypos = this.y;

                if (this.bulletOrigin == "top") {
                    xpos += xdir*this.h;
                    ypos += this.w + ydir*this.w;
                }
                else if (this.bulletOrigin == "center") {
                    ypos += 5;
                }

                var spread = this.spread;

                if (this.ammo.ammoCount) {
                    this.ammo.ammoCount--;
                    for (var i = 0, j = this.bulletBurst; i < j; i++) {
                        angleRadian = (rotation) * (Math.PI/180) - parseInt(j/2)*spread +i*spread;
                        ydir = Math.sin(angleRadian);
                        xdir = Math.cos(angleRadian);
                        Crafty.e('Bullet')
                            .attr({x : xpos, y : ypos, xdir : xdir, ydir : ydir, rotation : rotation})
                            .color(this.colors[this.lastColor]);
                    }
                }
            },


            takeDamage: function(ev) {
                console.log(ev);
            }
        });

        Crafty.c('Turret1', {
            init: function() {
                this.requires('BaseTurret');
            }
        });

        Crafty.c('Turret2', {
            init: function() {
                this.requires('BaseTurret');
                this.bulletOrigin = "center";
                this.rotate = false;
                this.fireRate = 30;
                this.image('assets/img/turret.png');
            }
        });

        Crafty.c('Bullet', {
            bulletspeed: 5,

            init: function() {
                this.requires('Actor, Color, Collision, Persist');
                this.attr({z: 4, w: 16, h: 16});
                this.origin('center');
                BGJ.dispatcher.trigger('bullet:create');
                this.bind('EnterFrame', function() {
                    this.rotation += 5;
                    this.x += this.xdir * this.bulletspeed;
                    this.y += this.ydir * this.bulletspeed;

                    if (this.y+this.h < 0 || this.x+this.w < 0 || this.x > this.w + game.get('width')) {
                        this.killBullet();
                    }
                });
            },

            killBullet: function() {
              BGJ.dispatcher.trigger('bullet:kill');
              this.destroy();
            }
        });

        Crafty.c('Ammo', {
            ammoCount: 0,
            maxCount: 10,
            rechargeInterval: 0,
            width: game.get('width') - 20,
            backgroundPosition: 0,
            init: function() {
                this.ammoCount = 10;
                this.requires('HTML')
                    .attr({x: 10, y: game.get('height') - 10, z: 3, w: this.width, h: 5})
                    .append("<div class='ammoContainer'><div class='ammoCrop'><div class='ammoBG'></div></div></div>");

                $(".ammoBG").width(this.width);
                this.ammoCount = this.maxCount;

                Crafty.e("Delay").delay(function() {
                  if (this.ammoCount < this.maxCount)
                    this.ammoCount++;
                }.bind(this), 500, -1);

                this.bind('EnterFrame', function() {
                  $('.ammoCrop').css({
                    'width': (this.ammoCount/this.maxCount) * this.width,
                  });
                }.bind(this));
            },
        });

        Crafty.c('Planet', {
            collisionOffset: 50,
            init: function() {

                this.requires('Actor, Image')
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
        
        Crafty.c('Monkeys', {
            init: function() {
                setInterval(_.bind(function(){
                    if (this.__image === 'assets/img/monkeys3.png') {
                        this.image('assets/img/monkeys.png');
                    } else if (this.__image === 'assets/img/monkeys.png') {
                        this.image('assets/img/monkeys2.png');
                    } else if (this.__image === 'assets/img/monkeys2.png') {
                        this.image('assets/img/monkeys3.png');
                    }
                }, this), 300);
            }

        });
    }
});

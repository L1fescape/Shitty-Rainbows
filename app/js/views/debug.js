define(['backbone', 'tpl!templates/debug.tpl'], function(Backbone, tpl) {
  return Backbone.View.extend({
    events: {
    },

    initialize: function() {
      // add debug element to DOM
      $("#dContainer").append("<div id='debug'></div>");
      this.setElement($("#debug"))
      // set key bindings
      this.bindKeys();
      
      this.render();

      // bindings
      BGJ.dispatcher.on("level:start", this.levelStart, this);

      // fps
      Crafty.bind('EnterFrame', function(){ this.frames++ }.bind(this));
      setInterval(function() {
        var fps = (this.frames/500)*1000;
        this.$el.find('.fps span').html(fps);
        this.frames = 0;
      }.bind(this), 500);
      // bind poops
      this.updatePoops();
      BGJ.dispatcher.on('poop:create', function() { this.poops++; this.updatePoops();}.bind(this));
      BGJ.dispatcher.on('poop:kill', function() { this.poops--; this.updatePoops();}.bind(this));
      // bind bullets
      this.updateBullets();
      BGJ.dispatcher.on('bullet:create', function() { this.bullets++; this.updateBullets();}.bind(this));
      BGJ.dispatcher.on('bullet:kill', function() { this.bullets--; this.updateBullets();}.bind(this));
    },

    // counts
    poops: 0,
    frames: 0,
    bullets: 0,
    level: 0,

    render: function() {
      this.$el.html(tpl({}));
    },

    resetCounts: function() {
      this.poops = Crafty('Poop').length;
      this.updatePoops();
      this.updateBullets();
    },

    levelStart: function(levelNumber) {
      this.level = levelNumber;
      this.updateLevel();
      this.resetCounts();
    },


    updatePoops: function() {
      this.$el.find('.poops span').html(this.poops);
    },

    updateBullets: function() {
      this.$el.find('.bullets span').html(this.bullets);
    },

    updateLevel: function() {
      this.$el.find('.level span').html(this.level);
    },

    bindKeys: function() {
        $(window).bind({
            keypress: function(e) {
                var key = String.fromCharCode(e.which);
                if (key == "1")
                    BGJ.dispatcher.trigger('level:complete', 1);
                if (key == "2")
                    BGJ.dispatcher.trigger('level:complete', 2);
                if (key == "3")
                    BGJ.dispatcher.trigger('level:complete', 3);
                if (key == "p")
                    Crafty.pause();
            },
        });
    },

  });
});

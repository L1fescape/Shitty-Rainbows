define(['backbone', 'models/game', 'tpl!templates/home.tpl'], function(Backbone, Game, tpl) {
  return Backbone.View.extend({
    el: $("#dPage"),

    events: {
    },

    initialize: function() {
      this.render();
      this.startGame();
      BGJ.dispatcher.on('views:closePage', this.close, this);
    },

    render: function() {
      this.$el.html(tpl({}));
    },

    startGame: function() {
      console.log("asdf")
      var game = new Game();
      Crafty.init(game.get('width'), game.get('height'));
      Crafty.background(game.get('bg'));
      BGJ.dispatcher.trigger('game:start');
    },

    close: function() {
      BGJ.dispatcher.off();
      this.unbind();
      this.undelegateEvents();
      this.$el.html("");
    }
  });
});

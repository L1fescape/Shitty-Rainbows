define(['backbone', 'models/game', 'tpl!templates/home.tpl'], function(Backbone, Game, tpl) {
  return Backbone.View.extend({
    el: $("#dPage"),

    events: {
    },

    initialize: function() {
      this.game = new Game();
      this.render();
    },

    render: function() {
      this.$el.html(tpl({}));
      Crafty.init(this.game.get('width'), this.game.get('height'));
      Crafty.background(this.game.get('bg'));
    },
  });
});

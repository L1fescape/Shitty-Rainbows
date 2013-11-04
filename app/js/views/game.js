define(['backbone', 'models/game', 'tpl!templates/home.tpl', 'views/debug'], function(Backbone, Game, tpl, Debug) {
  return Backbone.View.extend({
    el: $("#dPage"),

    events: {
    },

    initialize: function() {
      this.game = new Game();
      this.render();

      // comment this out to disable debug mode
      this.debug = new Debug();
    },

    render: function() {
      this.$el.html(tpl({}));
      Crafty.init(this.game.get('width'), this.game.get('height'));
      Crafty.background(this.game.get('bg'));
    },
  });
});

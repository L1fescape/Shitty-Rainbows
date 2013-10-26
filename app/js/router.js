define(['backbone', 'views/header', 'views/home', 'game/scenes'],
function(Backbone, HeaderView, HomeView) {
  return Backbone.Router.extend({
    routes: {
      '' : 'home',
      '!/level1' : 'level1'
    },

    initialize: function() {
      // init the header and the footer
      BGJ.vPgHeader = new HeaderView();
      BGJ.vPgHeader = new HomeView();

      BGJ.dispatcher.on("game:start", this.routeToGame, this);
    },

    home: function() {
      // show the header
      BGJ.vPgHeader.trigger("show");
      // tell the previous view to close itself
      BGJ.dispatcher.trigger("views:closePage");

      BGJ.vPgHome = new HomeView();
    },

      level1: function() {
          Crafty.scene('Loading');
      },

    routeToHome: function() {
      BGJ.router.navigate('#!/', {
        trigger: true
      });
    },

    routeToGame: function() {
        BGJ.router.navigate('#!/level1', {
            trigger: true
        });
    }
  });
});

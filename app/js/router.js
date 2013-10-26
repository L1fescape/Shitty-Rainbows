define(['backbone', 'views/header', 'views/home'],
function(Backbone, HeaderView, HomeView) {
  return Backbone.Router.extend({
    routes: {
      '' : 'home',
    },

    initialize: function() {
      // init the header and the footer
      BGJ.vPgHeader = new HeaderView();
    },

    home: function() {
      // show the header
      BGJ.vPgHeader.trigger("show");
      // tell the previous view to close itself
      BGJ.dispatcher.trigger("views:closePage");

      BGJ.vPgHome = new HomeView();
    },

    routeToHome: function() {
      BGJ.router.navigate('#/', {
        trigger: true
      });
    },
  });
});

define(['backbone', 'views/header', 'views/game', 'models/game', 'scenes/loading', 'levelController'],
function(Backbone, HeaderView, GameView, GameModel, loading, levelController) {
    return Backbone.Router.extend({
        loaded: false,

        routes: {
            '' : 'loading',
            'level/' : 'level',
            'level/:levelNumber' : 'level'
        },

        initialize: function() {
            // init the header and the footer
            BGJ.vPgHeader = new HeaderView();
            BGJ.GameModel = new GameModel();
            BGJ.GameView = new GameView({model: BGJ.GameModel});

            BGJ.dispatcher.on("game:loaded", this.loadingDone, this);
            BGJ.dispatcher.on("game:start", this.routeToLevel, this);
        },

        loading: function(levelStart) {
            // add ability to load the game and start from a given level
            if (levelStart)
                new loading(levelStart);
            else
                new loading();
        },

        level: function(levelNumber) {
            if (!this.loaded) {
                this.loading(levelNumber);
            }
            else if (!levelNumber || levelNumber > 20) {
                this.routeToLevel(1);
            }
            else {
                new levelController(levelNumber);
            }
        },

        loadingDone: function() {
            this.loaded = true;
        },

        routeToLoading: function() {
            BGJ.router.navigate('#/', {
                trigger: true
            });
        },

        routeToLevel: function(level) {
            level = level || "";
            BGJ.router.navigate('#/level/'+level, {
                trigger: true
            });
        }
    });
});

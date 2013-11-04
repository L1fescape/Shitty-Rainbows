define(['backbone', 'views/header', 'views/game', 'models/game', 'models/level', 'scenes/loading', 'scenes/level1', 'scenes/level2'],
function(Backbone, HeaderView, GameView, GameModel, LevelModel, loading, Level1, Level2) {
    return Backbone.Router.extend({
        loaded: false,
        level: null,

        before: {
            '^level' : function() {
                // replace all non-numeric parts of the route to get the level number
                var levelNumber = parseInt(Backbone.history.fragment.replace(/\D/g, ""))
                if (!this.loaded) {
                    new loading(levelNumber);
                    return false;
                }
                this.level = new LevelModel({levelNumber: levelNumber});
                return true;
            }
        },

        routes: {
            '' : 'loading',
            'level/1' : 'level1',
            'level/2' : 'level2',
        },

        initialize: function() {
            // init the header and the footer
            BGJ.vPgHeader = new HeaderView();
            BGJ.GameModel = new GameModel();
            BGJ.GameView = new GameView({model: BGJ.GameModel});

            BGJ.dispatcher.on("game:loaded", this.loadDone, this);
            BGJ.dispatcher.on("game:start", this.routeToLevel, this);
            BGJ.dispatcher.on("level:complete", this.routeToLevel, this);
        },

        loading: function(levelStart) {
            new loading();
        },

        level1: function() {
            new Level1({model: this.level});
        },

        level2: function() {
            new Level2({model: this.level});
        },

        routeToLevel: function(level) {
            level = level || 1;
            BGJ.router.navigate('#/level/'+level, {
                trigger: true
            });
        },

        loadDone: function() {
            this.loaded = true;
        },

    });
});

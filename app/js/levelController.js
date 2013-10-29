define(['models/level', 'scenes/levels'], function(LevelModel, LevelScene) {
    return function(levelNumber) {
        var model = new LevelModel({levelNumber: levelNumber});
        var scene = new LevelScene({model: model});
    }
});

define(['models/level', 'scenes/level1'], function(LevelModel, Scene) {
    return function(levelNumber) {
        var level = new LevelModel({levelNumber: levelNumber});
        if (levelNumber == 1) {
            new Scene({model: level});
        }
        else if (levelNumber == 2) {
            Crafty.e('Poop');
        }
    }
});

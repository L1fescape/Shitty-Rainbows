define(['models/level'], function(LevelModel) {
    return function(levelNumber) {
        new LevelModel({levelNumber: levelNumber});
        if (levelNumber == 1) {
            Crafty.e('Actor');
            Crafty.e('Poop');
        }
        else if (levelNumber == 2) {
            Crafty.e('Poop');
        }
    }
});

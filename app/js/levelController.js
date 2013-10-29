define(['models/level', 'scenes/level1', 'scenes/level2'], function(LevelModel, Level1, Level2) {
    return function(levelNumber) {
        var level = new LevelModel({levelNumber: levelNumber});
        if (levelNumber == 1) {
            new Level1({model: level});
        }
        else if (levelNumber == 2) {
            new Level2({model: level});
        }
    }
});

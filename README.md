# Shitty-Rainbows

Badass game for Bacon Game Jam 6


## Running the Game

You can either spawn a static file server written in Nodejs with the following:

```
node web.js
```

or simply point your favorite web server at the `app` directory.


## Building for Production

```
node_modules/requirejs/bin/r.js -o build.js
```

Then point the web server to the `dist` directory.


## Commit History

"There once was a fair young lass." - Crafty Scene integration with router and basic Game model.

"She lived on a planet near Alpha Centauri." -  Components and Level loader setup.

"Her neighbors were quite shitty, and she hadn't the slightest why?" - Update Readme.

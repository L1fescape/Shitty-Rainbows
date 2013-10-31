({
  appDir: 'app',
  baseUrl: 'js',
  dir: 'dist',
  fileExclusionRegExp: /^(r|build)\.js$/,
  // Modules to stub out in the optimized file.
  stubModules: ['tpl'],
  // Inlines any text! dependencies, to avoid separate requests.
  inlineText: true,
  optimize: 'uglify2',
  optimizeCss: 'standard',
  removeCombined: true,
  preserveLicenseComments: false,
  paths: {
    templates: '../templates',
    jquery: '../libs/jquery.min',
    backbone: '../libs/backbone-min',
    underscore: '../libs/underscore-min',
    crafty: '../libs/crafty-min',
    tpl: '../libs/requirejs-tpl'
  },
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: [
        'underscore',
        'jquery'
      ],
      exports: 'Backbone'
    },
    crafty: {
      exports: 'Crafty'
    }
  },
  modules: [{
    name: 'main'
  }],
})

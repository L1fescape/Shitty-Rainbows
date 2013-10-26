'use strict';

require.config({
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
  },
  paths: {
    templates: '../templates',
    jquery: '../libs/jquery.min',
    backbone: '../libs/backbone-min',
    underscore: '../libs/underscore-min',
    crafty: '../libs/crafty-min',
    tpl: '../libs/requirejs-tpl'
  }
});

require(['backbone', 'router'], function (Backbone, Router) {
  $(document).ready(function() {

    // create namespaces
    window.BGJ = window.BGJ || {};
    BGJ.dispatcher = BGJ.dispatcher || {};

    // create a global dispatcher of events
    _.extend(BGJ.dispatcher, Backbone.Events);

    // create the main app router
    BGJ.router = new Router();
    Backbone.history.start();
  });
});

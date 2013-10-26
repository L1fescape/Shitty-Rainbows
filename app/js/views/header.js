define(['backbone', 'tpl!templates/header.tpl'], function(Backbone, tpl) {
  return Backbone.View.extend({
    el: $("#hPageHeader"),

    events: {
    },

    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.html(tpl({}));
    },
  });
});

define(['backbone', 'tpl!templates/home.tpl'], 
function(Backbone, tpl) {
  return Backbone.View.extend({
    el: $("#dPage"),

    events: {
    },

    initialize: function() {
      this.render();
      BGJ.dispatcher.on('views:closePage', this.close, this);
    },

    render: function() {
      this.$el.html(tpl({}));
    },

    close: function() {
      BGJ.dispatcher.off();
      this.unbind();
      this.undelegateEvents();
      this.$el.html("");
    }
  });
});

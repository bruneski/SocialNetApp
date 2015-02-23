/**
 * Created by mbrune on 2/23/15.
 */

define(['text!template/index.html'], function(indexTemplate) {
    var indexView = Backbone.View.extend({
        el: $('#content'),

        render: function() {
            this.$el.html(indexTemplate);
        }
    });

    return new indexView;
});
define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.TextField.extend({
        didInsertElement : function () {
            this._super();

            var $this, id, label;

            Ember.$.validity.setup({
                outputMode : "label"
            });

            $this = this.$();

            id = $this.attr("id");
            label = Ember.$("label[for=" + id + "]");

            $this.attr("title", label.text().replace(" (*)", ""));
        }
    });
});

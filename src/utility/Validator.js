define([
    "Ember"
], function (Ember) {
    "use strict";

    return {
        validate : function (div) {
            var result, self;

            self = this;

            Ember.$.validity.start();

            div.find("input").each(function () {
                var $this, id, label;

                $this = Ember.$(this);

                id = $this.attr("id");
                label = Ember.$("label[for=" + id + "]");

                if (self.contains(label, "*")) {
                    $this.require();
                }

                if (self.contains(label, "mail")) {
                    $this.match("email");
                }
            });

            result = Ember.$.validity.end();

            return result.valid;
        },
        contains : function (label, key) {
            return label.parent().text().toLowerCase().indexOf(key) !== -1;
        }
    };
});

define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.Route.extend({
        redirect : function () {
            // TODO: Can't redirect twice? undefined? this.transitionTo("page");
            this.transitionTo("page.show", this.controllerFor("page").getIndexPage());
        }
    });
});

define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.Route.extend({
        renderTemplate : function () {
            var userController = this.controllerFor("user");

            this.render("UserView", {
                outlet : "applicationState",
                controller : userController
            });
        }
    });
});

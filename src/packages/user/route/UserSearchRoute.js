define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.Route.extend({
        renderTemplate : function () {
            var userController = this.controllerFor("user");

            this.render("UserSearchView", {
                outlet : "userState",
                controller : userController
            });

            this.render("UserSearchInputView", {
                outlet : "userSearchInput",
                controller : userController
            });

            this.render("UserSearchResultView", {
                outlet : "userSearchResult",
                controller : userController
            });
        },
        setupController : function (controller, model) {
            var applicationController = this.controllerFor("application");

            applicationController.updateTitle("user search");
        }
    });
});

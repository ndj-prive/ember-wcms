define([
    "Ember", "Validator"
], function (Ember, Validator) {
    "use strict";

    return Ember.Route.extend({
        renderTemplate : function () {
            var userController = this.controllerFor("user");

            this.render("UserAddView", {
                outlet : "userState",
                controller : userController
            });
        },
        setupController : function (controller, model) {
            var userController, applicationController;

            userController = this.controllerFor("user");
            applicationController = this.controllerFor("application");

            userController.set("currentUser", Ember.Object.create());
            applicationController.updateTitle("user add");
        },
        events : {
            register : function (router, event) {
                var div, isValid;

                div = event.view.$();
                isValid = Validator.validate(div);

                if (isValid) {
                    router.get("userController").addUser();

                    router.transitionTo("user.index");
                }
            },
            reset : function (router) {
                router.get("userController").set("currentUser", Ember.Object.create());

                Ember.$.validity.clear();
            }
        }
    });
});

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
            register : function (view) {
                var div, isValid, userController;

                div = view.$();
                isValid = Validator.validate(div);

                if (isValid) {
                    userController = this.controllerFor("user");

                    userController.addUser();

                    this.transitionTo("user.index");
                }
            },
            reset : function () {
                var userController = this.controllerFor("user");

                userController.set("currentUser", Ember.Object.create());

                Ember.$.validity.clear();
            }
        }
    });
});

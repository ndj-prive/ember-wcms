define([
    "Ember", "Validator"
], function (Ember, Validator) {
    "use strict";

    return Ember.Route.extend({
        model : function (params) {
            return this.controllerFor("user").findUser(params.id);
        },
        serialize : function (model, params) {
            return model._id;
        },
        originalUser : null,
        renderTemplate : function () {
            var userController = this.controllerFor("user");

            this.render("UserEditView", {
                outlet : "userState",
                controller : userController
            });
        },
        setupController : function (controller, model) {
            var userController, applicationController, tempUser;

            userController = this.controllerFor("user");
            applicationController = this.controllerFor("application");

            this.set("originalUser", model);
            tempUser = Ember.Object.create(this.get("originalUser"));
            userController.set("currentUser", tempUser);

            applicationController.updateTitle("user edit - " + model.get("name"));
        },
        events : {
            save : function (view) {
                var div, isValid, userController;

                div = view.$();
                isValid = Validator.validate(div);

                if (isValid) {
                    userController = this.controllerFor("user");

                    this.get("originalUser").setProperties(userController.get("currentUser"));
                    userController.set("currentUser", this.get("originalUser"));
                    userController.editUser();

                    this.transitionTo("user.index");
                }
            },
            reset : function () {
                var userController, tempUser;

                userController = this.controllerFor("user");
                tempUser = Ember.Object.create(this.get("originalUser"));

                userController.set("currentUser", tempUser);

                Ember.$.validity.clear();
            }
        }
    });
});

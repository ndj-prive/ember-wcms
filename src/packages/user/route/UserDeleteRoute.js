define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.Route.extend({
        model : function (params) {
            return this.controllerFor("user").findUser(params.id);
        },
        serialize : function (model, params) {
            return model._id;
        },
        renderTemplate : function () {
            var userController = this.controllerFor("user");

            this.render("UserDeleteView", {
                outlet : "userState",
                controller : userController
            });
        },
        setupController : function (controller, model) {
            var userController, applicationController;

            userController = this.controllerFor("user");
            applicationController = this.controllerFor("application");

            userController.set("currentUser", model);
            applicationController.updateTitle("user delete - " + model.get("name"));
        },
        events : {
            confirm : function () {
                this.controllerFor("user").deleteUser();

                this.transitionTo("user.index");
            }
        }
    });
});

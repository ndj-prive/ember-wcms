define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.Route.extend({
        model : function (params) {
            return this.controllerFor("page").findPage(params.id);
        },
        serialize : function (model, params) {
            return model._id;
        },
        renderTemplate : function () {
            var pageController = this.controllerFor("page");

            this.render("PageDeleteView", {
                outlet : "pageState",
                controller : pageController
            });
        },
        setupController : function (controller, model) {
            var pageController, applicationController;

            pageController = this.controllerFor("page");
            applicationController = this.controllerFor("application");

            pageController.set("currentPage", model);
            applicationController.updateTitle("page delete - " + model.get("menuTitle"));
        },
        events : {
            confirm : function (router) {
                router.get("pageController").deletePage();

                router.transitionTo("page.index");
            }
        }
    });
});

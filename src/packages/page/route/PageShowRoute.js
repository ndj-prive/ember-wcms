define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.Route.extend({
        model : function (params) {
            return this.controllerFor("page").findPage(params.id);
        },
        serialize : function (model, params) {
            return model.get("_id");
        },
        renderTemplate : function () {
            var pageController = this.controllerFor("page");

            this.render("PageShowView", {
                outlet : "pageState",
                controller : pageController
            });
        },
        setupController : function (controller, model) {
            var pageController, applicationController;

            pageController = this.controllerFor("page");
            applicationController = this.controllerFor("application");

            pageController.showPage(model);
            applicationController.updateTitle(model.get("menuTitle"));
        },
        events : {
            save : function () {
                this.controllerFor("page").editPage();
            }
        }
    });
});

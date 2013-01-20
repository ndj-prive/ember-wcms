define([
    "Ember", "Validator"
], function (Ember, Validator) {
    "use strict";

    return Ember.Route.extend({
        model : function (params) {
            return this.controllerFor("page").findPage(params.id);
        },
        serialize : function (model, params) {
            return model._id;
        },
        originalPage : null,
        renderTemplate : function () {
            var pageController = this.controllerFor("page");

            this.render("PageEditView", {
                outlet : "pageState",
                controller : pageController
            });
        },
        setupController : function (controller, model) {
            var pageController, applicationController, tempPage;

            pageController = this.controllerFor("page");
            applicationController = this.controllerFor("application");

            this.set("originalPage", model);
            tempPage = Ember.Object.create(this.get("originalPage"));
            pageController.set("currentPage", tempPage);

            applicationController.updateTitle("page edit - " + model.get("menuTitle"));
        },
        events : {
            save : function (router, event) {
                var div, isValid;

                div = event.view.$();
                isValid = Validator.validate(div);

                if (isValid) {
                    this.get("originalPage").setProperties(router.get("pageController").get("currentPage"));

                    router.get("pageController").set("currentPage", this.get("originalPage"));

                    router.get("pageController").editPage();

                    router.transitionTo("page.show", router.get("pageController.currentPage"));
                }
            },
            reset : function (router) {
                var tempPage = Ember.Object.create(this.get("originalPage"));

                router.get("pageController").set("currentPage", tempPage);

                Ember.$.validity.clear();
            }
        }
    });
});

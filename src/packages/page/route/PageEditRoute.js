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
            save : function (view) {
                var div, isValid, pageController;

                div = view.$();
                isValid = Validator.validate(div);

                if (isValid) {
                    pageController = this.controllerFor("page");

                    this.get("originalPage").setProperties(pageController.get("currentPage"));
                    pageController.set("currentPage", this.get("originalPage"));
                    pageController.editPage();

                    this.transitionTo("page.show", pageController.get("currentPage"));
                }
            },
            reset : function () {
                var pageController, tempPage;

                pageController = this.controllerFor("page");
                tempPage = Ember.Object.create(this.get("originalPage"));

                pageController.set("currentPage", tempPage);

                Ember.$.validity.clear();
            }
        }
    });
});

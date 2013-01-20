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
        parentPage : null,
        renderTemplate : function () {
            var pageController = this.controllerFor("page");

            this.render("PageAddView", {
                outlet : "pageState",
                controller : pageController
            });
        },
        setupController : function (controller, model) {
            var pageController, applicationController;

            pageController = this.controllerFor("page");
            applicationController = this.controllerFor("application");

            this.set("parentPage", model);
            pageController.set("currentPage", Ember.Object.create({
                content : "<p>Edit me!</p>",
                menuTitle : "",
                name : "",
                isHidden : false,
                parent : this.get("parentPage._id")
            }));

            applicationController.updateTitle("page add");
        },
        events : {
            add : function (view) {
                var div, isValid, pageController;

                div = view.$();
                isValid = Validator.validate(div);

                if (isValid) {
                    pageController = this.controllerFor("page");

                    pageController.addPage();

                    this.transitionTo("page.show", pageController.get("currentPage"));
                }
            },
            reset : function () {
                var pageController = this.controllerFor("page");

                pageController.set("currentPage", Ember.Object.create({
                    content : "<p>Edit me!</p>",
                    menuTitle : "",
                    name : "",
                    isHidden : false,
                    parent : this.get("parentPage._id")
                }));

                Ember.$.validity.clear();
            }
        }
    });
});

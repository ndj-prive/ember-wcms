define([
    "Ember", "Validator"
], function (Ember, Validator) {
    "use strict";

    return Ember.Route.extend({
        route : "/:id/edit",
        deserialize : function (router, context) {
            return router.get("pageController").findPage(context.id);
        },
        serialize : function (router, context) {
            return {
                id : context._id
            };
        },
        originalPage : null,
        connectOutlets : function (router, context) {
            this.set("originalPage", context);

            var tempPage = Ember.Object.create(this.get("originalPage"));

            router.get("pageController").set("currentPage", tempPage);

            router.get("pageController").connectOutlet({
                outletName : "pageState",
                viewClass : router.namespace.PageEditView,
                controller : router.get("pageController")
            });

            router.get("applicationController").updateTitle("page edit - " + context.get("menuTitle"));
        },
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
    });
});

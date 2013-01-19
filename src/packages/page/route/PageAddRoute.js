define([
	"Ember", "Validator"
], function (Ember, Validator) {
	"use strict";

	return Ember.Route.extend({
		route : "/:id/add",
		deserialize : function (router, context) {
			return router.get("pageController").findPage(context.id);
		},
		serialize : function (router, context) {
			return {
				id : context._id
			};
		},
		parentPage : null,
		connectOutlets : function (router, context) {
			this.set("parentPage", context);

			router.get("pageController").set("currentPage", Ember.Object.create({
				content : "<p>Edit me!</p>",
				menuTitle : "",
				name : "",
				isHidden : false,
				parent : this.get("parentPage._id")
			}));

			router.get("pageController").connectOutlet({
				outletName : "pageState",
				viewClass : router.namespace.PageAddView,
				controller : router.get("pageController")
			});

			router.get("applicationController").updateTitle("page add");
		},
		add : function (router, event) {
			var div, isValid;

			div = event.view.$();
			isValid = Validator.validate(div);

			if (isValid) {
				router.get("pageController").addPage();

				router.transitionTo("page.show", router.get("pageController.currentPage"));
			}
		},
		reset : function (router) {
			router.get("pageController").set("currentPage", Ember.Object.create({
				content : "<p>Edit me!</p>",
				menuTitle : "",
				name : "",
				isHidden : false,
				parent : this.get("parentPage._id")
			}));

			Ember.$.validity.clear();
		}
	});
});
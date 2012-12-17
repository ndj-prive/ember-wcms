define([
	"Ember"
], function (Ember) {
	"use strict";

	return Ember.Route.extend({
		route : "/:id",
		deserialize : function (router, context) {
			return router.get("pageController").findPage(context.id);
		},
		serialize : function (router, context) {
			return {
				id : context._id
			};
		},
		connectOutlets : function (router, context) {
			router.get("pageController").showPage(context);

			router.get("pageController").connectOutlet({
				outletName : "pageState",
				viewClass : router.namespace.PageShowView,
				controller : router.get("pageController")
			});

			router.get("applicationController").updateTitle(context.get("menuTitle"));
		},
		save : function (router) {
			router.get("pageController").editPage();
		}
	});
});
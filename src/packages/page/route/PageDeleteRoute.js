define([
	"Ember"
], function (Ember) {
	"use strict";

	return Ember.Route.extend({
		route : "/:id/delete",
		deserialize : function (router, context) {
			return router.get("pageController").findPage(context.id);
		},
		serialize : function (router, context) {
			return {
				id : context._id
			};
		},
		connectOutlets : function (router, context) {
			router.get("pageController").set("currentPage", context);

			router.get("pageController").connectOutlet({
				outletName : "pageState",
				viewClass : router.namespace.PageDeleteView,
				controller : router.get("pageController")
			});

			router.get("applicationController").updateTitle("page delete - " + context.get("menuTitle"));
		},
		confirm : function (router) {
			router.get("pageController").deletePage();

			router.transitionTo("page.index");
		}
	});
});
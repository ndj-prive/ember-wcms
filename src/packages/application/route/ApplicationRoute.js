define([
	"Ember", "PageRoute", "UserRoute"
], function (Ember, PageRoute, UserRoute) {
	"use strict";

	return Ember.Route.extend({
		route : "/",
		connectOutlets : function (router) {
			router.get("applicationController").connectOutlet({
				outletName : "login",
				name : "login"
			});

			router.get("loginController").checkSession();

			router.get("applicationController").connectControllers("login");

			router.get("applicationController").connectOutlet({
				outletName : "adminNavigation",
				viewClass : router.namespace.AdminNavigationView,
				controller : router.get("applicationController")
			});

			router.get("applicationController").connectOutlet({
				outletName : "loading",
				viewClass : router.namespace.LoadingView,
				controller : router.get("applicationController")
			});

			router.get("applicationController").updateTitle("application");
		},
		index : Ember.Route.extend({
			route : "/",
			redirectsTo : "page.index"
		}),
		login : function (router) {
			router.get("loginController").login();
		},
		logout : function (router) {
			router.get("loginController").logout();

			router.transitionTo("page.index");
		},
		gotoPages : Ember.Router.transitionTo("page.index"),
		page : PageRoute,
		gotoUsers : Ember.Router.transitionTo("user.index"),
		user : UserRoute
	});
});
define([
	"Ember", "Validator"
], function (Ember, Validator) {
	"use strict";

	return Ember.Route.extend({
		route : "/add",
		connectOutlets : function (router) {
			router.get("userController").set("currentUser", Ember.Object.create());

			router.get("userController").connectOutlet({
				outletName : "userState",
				viewClass : router.namespace.UserAddView,
				controller : router.get("userController")
			});

			router.get("applicationController").updateTitle("user add");
		},
		register : function (router, event) {
			var div, isValid;

			div = event.view.$();
			isValid = Validator.validate(div);

			if (isValid) {
				router.get("userController").addUser();

				router.transitionTo("user.index");
			}
		},
		reset : function (router) {
			router.get("userController").set("currentUser", Ember.Object.create());

			Ember.$.validity.clear();
		}
	});
});
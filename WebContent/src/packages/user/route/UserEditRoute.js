define([
	"Ember", "Validator"
], function (Ember, Validator) {
	"use strict";

	return Ember.Route.extend({
		route : "/:id/edit",
		deserialize : function (router, context) {
			return router.get("userController").findUser(context.id);
		},
		serialize : function (router, context) {
			return {
				id : context._id
			};
		},
		originalUser : null,
		connectOutlets : function (router, context) {
			this.set("originalUser", context);

			var tempUser = Ember.Object.create(this.get("originalUser"));

			router.get("userController").set("currentUser", tempUser);

			router.get("userController").connectOutlet({
				outletName : "userState",
				viewClass : router.namespace.UserEditView,
				controller : router.get("userController")
			});

			router.get("applicationController").updateTitle("user edit - " + context.get("name"));
		},
		save : function (router, event) {
			var div, isValid;

			div = event.view.$();
			isValid = Validator.validate(div);

			if (isValid) {
				this.get("originalUser").setProperties(router.get("userController").get("currentUser"));

				router.get("userController").set("currentUser", this.get("originalUser"));

				router.get("userController").editUser();

				router.transitionTo("user.index");
			}
		},
		reset : function (router) {
			var tempUser = Ember.Object.create(this.get("originalUser"));

			router.get("userController").set("currentUser", tempUser);

			Ember.$.validity.clear();
		}
	});
});
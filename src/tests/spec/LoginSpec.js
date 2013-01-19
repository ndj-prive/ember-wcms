define([
	"Ember"
], function (Ember) {
	"use strict";

	return {
		controller : null,
		applicationController : null,
		run : function () {
			var self = this;

			this.controller = Ember.App.router.get("loginController");
			this.applicationController = Ember.App.router.get("applicationController");

			describe("Login", function () {
				self.wrongLogin();
				self.login();
				self.logout();
			});
		},
		login : function () {
			var self = this;

			it("login", function () {
				self.controller.set("name", "mollytucker");
				self.controller.set("password", "molly123");

				self.controller.login();

				waitsFor(function () {
					return !self.applicationController.get("isLoading");
				}, "AJAX timeout", 5000);

				runs(function () {
					expect(self.controller.get("isLoggedIn")).toBe(true);
				});
			});
		},
		logout : function () {
			var self = this;

			it("logout", function () {
				self.controller.logout();

				waitsFor(function () {
					return !self.applicationController.get("isLoading");
				}, "AJAX timeout", 5000);

				runs(function () {
					expect(self.controller.get("isLoggedIn")).toBe(false);
				});
			});
		},
		wrongLogin : function () {
			var self = this;

			it("login with wrong credentials", function () {
				self.controller.set("name", "ThisIsAWrongUserNameIHopeThisIsNotInTheDatabase");
				self.controller.set("password", "IfItIsThenThisSurelyCanNotBeThePassword");

				self.controller.login();

				waitsFor(function () {
					return !self.applicationController.get("isLoading");
				}, "AJAX timeout", 5000);

				runs(function () {
					expect(self.controller.get("isLoggedIn")).toBe(false);
				});
			});
		}
	};
});
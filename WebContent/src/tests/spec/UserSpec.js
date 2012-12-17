define([
	"Ember"
], function (Ember) {
	"use strict";

	return {
		controller : null,
		applicationController : null,
		loginController : null,
		run : function () {
			var self = this;

			this.controller = Ember.App.router.get("userController");
			this.applicationController = Ember.App.router.get("applicationController");
			this.loginController = Ember.App.router.get("loginController");

			describe("Users", function () {
				self.loginWithPermissions();

				self.searchUsers();

				var user = Ember.Object.create({
					firstName : "Molly",
					lastName : "UnitTest",
					emailAddress : "LaMa@openCMS.com",
					cellphoneNumber : "123456",
					telephoneNumber : "654321",
					streetAndNr : "Somewhere 8",
					zipCode : "8400",
					city : "Ostend",
					birthDate : "03/05/1991",
					name : "MollyUnitTest",
					roles : [
						"user"
					],
					type : "user",
					password : "UnitTest123"
				});

				self.addUser(user);
				self.editUser(user);
				self.deleteUser(user);
			});

		},
		loginWithPermissions : function () {
			var self = this;

			it("login with permissions", function () {
				self.loginController.set("name", "testadmin");
				self.loginController.set("password", "testadmin23");
				self.loginController.login();

				waitsFor(function () {
					return !self.applicationController.get("isLoading");
				}, "AJAX timeout", 5000);

				runs(function () {
					expect(self.loginController.get("isLoggedIn")).toBe(true);
				});
			});
		},
		searchUsers : function () {
			var self = this;

			it("search users", function () {
				self.controller.set("searchText", "Molly");
				self.controller.searchUsers();

				waitsFor(function () {
					return !self.applicationController.get("isLoading");
				}, "AJAX timeout", 5000);

				runs(function () {
					expect(self.controller.get("length")).not.toBe(0);
					expect(self.controller.get("firstObject.firstName")).toBe("Molly");
				});
			});
		},
		addUser : function (user) {
			var self = this;

			it("add user", function () {
				self.controller.set("currentUser", user);
				self.controller.addUser();

				waitsFor(function () {
					return !self.applicationController.get("isLoading");
				}, "AJAX timeout", 5000);

				runs(function () {
					self.controller.set("searchText", "Somewhere 8");
					self.controller.searchUsers();

					waitsFor(function () {
						return !self.applicationController.get("isLoading");
					}, "AJAX timeout", 10000);

					runs(function () {
						expect(self.controller.get("firstObject.lastName")).toBe("UnitTest");
					});
				});
			});
		},
		editUser : function (user) {
			var self = this;

			it("edit user", function () {
				self.controller.set("currentUser", user);
				self.controller.set("currentUser.lastName", "UnitTestEdited");
				self.controller.editUser();

				waitsFor(function () {
					return !self.applicationController.get("isLoading");
				}, "AJAX timeout", 5000);

				runs(function () {
					self.controller.set("searchText", "Somewhere 8");
					self.controller.searchUsers();

					waitsFor(function () {
						return !self.applicationController.get("isLoading");
					}, "AJAX timeout", 5000);

					runs(function () {
						expect(self.controller.get("firstObject.lastName")).toBe("UnitTestEdited");
					});
				});
			});
		},
		deleteUser : function (user) {
			var self = this;

			it("delete user", function () {
				self.controller.set("currentUser", user);
				self.controller.deleteUser();

				waitsFor(function () {
					return !self.applicationController.get("isLoading");
				}, "AJAX timeout", 10000);

				runs(function () {
					self.controller.set("searchText", "Somewhere 8");
					self.controller.searchUsers();

					waitsFor(function () {
						return !self.applicationController.get("isLoading");
					}, "AJAX timeout", 10000);

					runs(function () {
						expect(self.controller.get("length")).toBe(0);
					});
				});
			});
		}
	};
});
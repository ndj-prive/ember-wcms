define([
	"Ember", "ApplicationController", "ApplicationView", "LoginController", "LoginView", "AdminNavigationView", "LoadingView"
], function (Ember, ApplicationController, ApplicationView, LoginController, LoginView, AdminNavigationView, LoadingView) {
	"use strict";

	return {
		initialize : function () {
			Ember.App.ApplicationController = ApplicationController;
			Ember.App.ApplicationView = ApplicationView;

			Ember.App.LoginController = LoginController;
			Ember.App.LoginView = LoginView;

			Ember.App.AdminNavigationView = AdminNavigationView;
			Ember.App.LoadingView = LoadingView;
		}
	};
});
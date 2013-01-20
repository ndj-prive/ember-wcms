define([
    "Ember", "ApplicationController", "LoginController", "ApplicationRoute", "IndexRoute", "ApplicationView", "LoginView", "AdminNavigationView", "LoadingView"
], function (Ember, ApplicationController, LoginController, ApplicationRoute, IndexRoute, ApplicationView, LoginView, AdminNavigationView, LoadingView) {
    "use strict";

    return {
        initialize : function () {
            Ember.App.ApplicationController = ApplicationController;
            Ember.App.LoginController = LoginController;

            Ember.App.ApplicationRoute = ApplicationRoute;
            Ember.App.IndexRoute = IndexRoute;
            Ember.App.ApplicationView = ApplicationView;

            Ember.App.LoginView = LoginView;

            Ember.App.AdminNavigationView = AdminNavigationView;
            Ember.App.LoadingView = LoadingView;
        }
    };
});

define([
    "Ember", "UserController", "UserView", "UserSearchView", "UserSearchInputView", "UserSearchResultView", "UserAddView", "UserShowView", "UserEditView", "UserDeleteView", "UserRoute",
    "UserIndexRoute", "UserSearchRoute", "UserAddRoute", "UserShowRoute", "UserEditRoute", "UserDeleteRoute"
], function (Ember, UserController, UserView, UserSearchView, UserSearchInputView, UserSearchResultView, UserAddView, UserShowView, UserEditView, UserDeleteView, UserRoute, UserIndexRoute,
             UserSearchRoute, UserAddRoute, UserShowRoute, UserEditRoute, UserDeleteRoute) {
    "use strict";

    return {
        initialize : function () {
            Ember.App.UserController = UserController;

            Ember.App.UserRoute = UserRoute;
            Ember.App.UserIndexRoute = UserIndexRoute;
            Ember.App.UserView = UserView;

            Ember.App.UserSearchRoute = UserSearchRoute;
            Ember.App.UserSearchView = UserSearchView;
            Ember.App.UserSearchInputView = UserSearchInputView;
            Ember.App.UserSearchResultView = UserSearchResultView;

            Ember.App.UserAddRoute = UserAddRoute;
            Ember.App.UserAddView = UserAddView;

            Ember.App.UserShowRoute = UserShowRoute;
            Ember.App.UserShowView = UserShowView;

            Ember.App.UserEditRoute = UserEditRoute;
            Ember.App.UserEditView = UserEditView;

            Ember.App.UserDeleteRoute = UserDeleteRoute;
            Ember.App.UserDeleteView = UserDeleteView;
        }
    };
});

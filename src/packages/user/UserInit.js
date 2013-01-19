define([
	"Ember", "UserController", "UserView", "UserSearchView", "UserSearchInputView", "UserSearchResultView", "UserAddView", "UserShowView",
	"UserEditView", "UserDeleteView"
], function (Ember, UserController, UserView, UserSearchView, UserSearchInputView, UserSearchResultView, UserAddView, UserShowView, UserEditView,
	UserDeleteView) {
	"use strict";

	return {
		initialize : function () {
			Ember.App.UserController = UserController;
			Ember.App.UserView = UserView;

			Ember.App.UserSearchView = UserSearchView;
			Ember.App.UserSearchInputView = UserSearchInputView;
			Ember.App.UserSearchResultView = UserSearchResultView;

			Ember.App.UserAddView = UserAddView;

			Ember.App.UserShowView = UserShowView;
			Ember.App.UserEditView = UserEditView;
			Ember.App.UserDeleteView = UserDeleteView;
		}
	};
});
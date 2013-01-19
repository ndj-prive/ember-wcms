define([
	"Ember", "PageController", "PageView", "MenuView", "PageAddView", "PageAddLinkView", "PageShowView", "PageEditView", "PageDeleteView"
], function (Ember, PageController, PageView, MenuView, PageAddView, PageAddLinkView, PageShowView, PageEditView, PageDeleteView) {
	"use strict";

	return {
		initialize : function () {
			Ember.App.PageController = PageController;
			Ember.App.PageView = PageView;

			Ember.App.MenuView = MenuView;

			Ember.App.PageAddView = PageAddView;
			Ember.App.PageAddLinkView = PageAddLinkView;

			Ember.App.PageShowView = PageShowView;
			Ember.App.PageEditView = PageEditView;
			Ember.App.PageDeleteView = PageDeleteView;
		}
	};
});
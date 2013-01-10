define([
	"Ember", "MenuItemView"
], function (Ember, MenuItemView) {
	"use strict";

	return Ember.CollectionView.extend({
		contentBinding : "controller.visiblePages",
		itemViewClass : MenuItemView,
		tagName : "ul",
		classNames: ["pageMenuView"]
	});
});
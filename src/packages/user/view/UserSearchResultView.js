define([
	"Ember", "text!UserTemplate/UserSearchResult.handlebars"
], function (Ember, template) {
	"use strict";

	return Ember.View.extend({
		template : Ember.Handlebars.compile(template)
	});
});
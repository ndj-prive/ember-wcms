define([
	"Ember", "text!PageTemplate/PageDelete.handlebars"
], function (Ember, template) {
	"use strict";

	return Ember.View.extend({
		template : Ember.Handlebars.compile(template)
	});
});
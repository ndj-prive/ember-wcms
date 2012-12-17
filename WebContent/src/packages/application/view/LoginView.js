define([
	"Ember", "text!ApplicationTemplate/Login.handlebars"
], function (Ember, template) {
	"use strict";

	return Ember.View.extend({
		template : Ember.Handlebars.compile(template),
		LoginTextField : Ember.TextField.extend({
			insertNewline : function () {
				this.get("controller.target").send("login");
			}
		})
	});
});
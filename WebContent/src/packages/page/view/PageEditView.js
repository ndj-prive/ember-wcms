define([
	"Ember", "text!PageTemplate/PageInput.handlebars", "FormPreparer"
], function (Ember, template, FormPreparer) {
	"use strict";

	return Ember.View.extend({
		template : Ember.Handlebars.compile(template),
		didInsertElement : function () {
			this._super();

			var div = this.$();

			FormPreparer.prepare(div);
		},
		isAdding : false
	});
});
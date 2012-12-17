define([
	"Ember"
], function (Ember) {
	"use strict";

	return {
		validate : function (div) {
			var result, self;

			self = this;

			Ember.$.validity.start();

			div.find("input").each(function () {
				var inputId, label;

				inputId = Ember.$(this).attr("id");
				label = Ember.$("label[for=" + inputId + "]");

				if (self.contains(label, "*")) {
					Ember.$(this).require();
				}

				if (self.contains(label, "mail")) {
					Ember.$(this).match("email");
				}
			});

			result = Ember.$.validity.end();

			return result.valid;
		},
		contains : function (label, key) {
			return label.parent().text().toLowerCase().indexOf(key) !== -1;
		}
	};
});
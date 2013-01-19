define([
	"Ember"
], function (Ember) {
	"use strict";

	return {
		prepare : function (div) {
			var self = this;

			Ember.$.validity.setup({
				outputMode : "label"
			});

			div.find("input").each(function () {
				var inputId, label;

				inputId = Ember.$(this).attr("id");
				label = Ember.$("label[for=" + inputId + "]");

				Ember.$(this).attr("title", label.text().replace(" (*)", ""));

				if (self.contains(label, "date")) {
					self.setDatepicker(this);
				}
			});
		},
		setDatepicker : function (selector) {
			Ember.$(selector).attr("readonly", "true");

			Ember.$(selector).datepicker({
				changeMonth : true,
				changeYear : true,
				dateFormat : "dd/mm/yy",
				dayNames : [
					"Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"
				],
				dayNamesMin : [
					"Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"
				],
				firstDay : 1,
				monthNames : [
					"Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"
				],
				monthNamesShort : [
					"Jan", "Feb", "Maa", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"
				],
				nextText : "Volgende",
				prevText : "Vorige",
				yearRange : "-120:+0"
			});
		},
		contains : function (label, key) {
			return label.parent().text().toLowerCase().indexOf(key) !== -1;
		}
	};
});
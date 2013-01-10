define([
	"Ember", "text!PageTemplate/MenuItem.handlebars"
], function (Ember, template) {
	"use strict";

	return Ember.View.extend({
		template : Ember.Handlebars.compile(template),
		isRenaming : false,
		enableRenameMenuTitle : function () {
			this.set("isRenaming", true);
		},
		dropDownId : function () {
			return "dropdown-" + this.get("content._id");
		}.property("content._id"),
		RenameTextField : Ember.TextField.extend({
			didInsertElement : function () {
				this._super();

				this.$().focus();
			},
			insertNewline : function (event) {
				this.saveRenameMenuTitle(event);
			},
			focusOut : function (event) {
				if (this.get("parentView.isRenaming")) {
					this.saveRenameMenuTitle(event);
				}
			},
			saveRenameMenuTitle : function (event) {
				var view = this.get("parentView");

				event.context = view.get("content");

				this.get("controller.target").send("saveRenameMenuTitle", event);

				view.set("isRenaming", false);
			},
			classNames : [
				"input-small"
			]
		})
	});
});
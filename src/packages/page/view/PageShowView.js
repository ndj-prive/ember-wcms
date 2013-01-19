define([
	"Ember", "text!PageTemplate/PageShow.handlebars", "Editor"
], function (Ember, template, Editor) {
	"use strict";

	return Ember.View.extend({
		template : Ember.Handlebars.compile(template),
		didInsertElement : function () {
			this._super();

			this.enableEditor();
		},
		willDestroyElement : function () {
			this.disableEditor();
		},
		whenIsLoggedInChanged : function () {
			this.rerender();
		}.observes("controller.isLoggedIn"),
		enableEditor : function () {
			if (this.get("controller.isLoggedIn")) {
				Editor.inline("pageContentEditor");
			}
		},
		disableEditor : function () {
			if (Editor.instances.pageContentEditor) {
				Editor.instances.pageContentEditor.destroy(true);
			}
		},
		save : function () {
			var newContent = Editor.instances.pageContentEditor.getData();

			this.set("controller.currentPage.content", newContent);

			this.get("controller.target").send("save");
		}
	});
});
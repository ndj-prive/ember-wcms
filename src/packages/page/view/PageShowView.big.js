define([
    "Ember", "text!PageTemplate/PageShow.handlebars", "Editor"
], function (Ember, template, Editor) {
    "use strict";

    return Ember.View.extend({
        template : Ember.Handlebars.compile(template),
        // TODO: Als met de CKEditor-big source gewerkt wordt, moet je
        // uncommenten
        // isEditorReady : false,
        // init : function () {
        // this._super();
        //
        // var self = this;
        //
        // Editor.disableAutoInline = true;
        // Editor.on("loaded", function () {
        // self.set("isEditorReady", true);
        //
        // self.toggleEditor();
        // });
        // },
        didInsertElement : function () {
            this._super();

            var self = this;

            Ember.$("#pageContentEditor").blur(function () {
                var newContent = Editor.instances.pageContentEditor.getData();

                self.set("controller.currentPage.content", newContent);
            });

            this.toggleEditor();
        },
        whenCurrentPageChanged : function () {
            this.rerender();
        }.observes("controller.currentPage.content", "controller.isLoggedIn"),
        toggleEditor : function () {
            // if (this.get("controller.isLoggedIn") &&
            // this.get("isEditorReady")) {
            if (this.get("controller.isLoggedIn")) {
                if (Editor.instances.pageContentEditor) {
                    Editor.instances.pageContentEditor.destroy(true);
                }

                Editor.inline("pageContentEditor");
            }
        }
    });
});

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
        dropDownId : Ember.computed(function () {
            return "dropdown-" + this.get("content._id");
        }).property("content._id"),
        RenameTextField : Ember.TextField.extend({
            didInsertElement : function () {
                this._super();

                this.$().focus();
            },
            //TODO: Not AnySurfer-compliant. When pressing enter on the Rename-button in the dropdown, it immediatly invocates this event, without being able to edit the title.
            insertNewline : function (page) {
                this.saveRenameMenuTitle(page);
            },
            focusOut : function (page) {
                if (this.get("parentView.isRenaming")) {
                    this.saveRenameMenuTitle(page);
                }
            },
            saveRenameMenuTitle : function (page) {
                this.get("controller.target").send("saveRenameMenuTitle", page);

                this.get("parentView").set("isRenaming", false);
            }
        })
    });
});

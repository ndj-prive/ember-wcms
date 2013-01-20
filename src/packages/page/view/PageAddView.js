define([
    "Ember", "text!PageTemplate/PageInput.handlebars", "TitleTextField"
], function (Ember, template, TitleTextField) {
    "use strict";

    return Ember.View.extend({
        template : Ember.Handlebars.compile(template),
        isAdding : true,
        TitleTextField : TitleTextField
    });
});

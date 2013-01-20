define([
    "Ember", "text!UserTemplate/UserInput.handlebars", "TitleTextField", "DatepickerTextField"
], function (Ember, template, TitleTextField, DatepickerTextField) {
    "use strict";

    return Ember.View.extend({
        template : Ember.Handlebars.compile(template),
        isAdding : true,
        TitleTextField : TitleTextField,
        DatepickerTextField : DatepickerTextField
    });
});

define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.Controller.extend({
        title : null,
        loginController : null,
        isLoggedInBinding : "loginController.isLoggedIn",
        init : function () {
            this._super();

            var self = this;

            this.set("title", document.title);

            Ember.$(document).ajaxStart(function () {
                self.incrementProperty("amountOfLoaders");
            });

            Ember.$(document).ajaxStop(function () {
                self.decrementProperty("amountOfLoaders");
            });
        },
        amountOfLoaders : 0,
        isLoading : function () {
            return this.get("amountOfLoaders") > 0;
        }.property("amountOfLoaders"),
        updateTitle : function (title) {
            document.title = this.get("title") + title;
        }
    });
});

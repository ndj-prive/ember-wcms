define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.ObjectController.extend({
        content : Ember.Object.create(),
        isLoggedIn : false,
        isValidLogin : true,
        login : function () {
            var self = this;

            Ember.$.couch.login({
                name : self.get("name"),
                password : self.get("password"),
                success : function (data) {
                    var currentUser = Ember.Object.create(data);

                    if (!currentUser.get("name")) {
                        currentUser.set("name", self.get("name"));
                    }

                    self.set("content", currentUser);
                    self.set("isLoggedIn", true);
                    self.set("isValidLogin", true);
                },
                error : function (data) {
                    self.set("isLoggedIn", false);
                    self.set("isValidLogin", false);
                }
            });
        },
        logout : function () {
            var self = this;

            Ember.$.couch.logout({
                success : function (data) {
                    var currentUser = Ember.Object.create();

                    self.set("content", currentUser);
                    self.set("isLoggedIn", false);
                }
            });
        },
        checkSession : function () {
            var self = this;

            Ember.$.couch.session({
                success : function (data) {
                    if (data.userCtx.name) {
                        var currentUser = Ember.Object.create(data.userCtx);

                        self.set("content", currentUser);
                        self.set("isLoggedIn", true);
                    } else {
                        self.set("isLoggedIn", false);
                    }
                }
            });
        }
    });
});

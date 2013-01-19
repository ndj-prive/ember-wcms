define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.ArrayController.extend({
        currentUser : null,
        addUser : function () {
            var user = this.get("currentUser");

            user.set("_id", "org.couchdb.user:" + user.get("name"));
            user.set("type", "user");
            user.set("roles", [
                "user"
            ]);

            Ember.$.couch.db("_users").saveDoc(user);
        },
        editUser : function () {
            Ember.$.couch.db("_users").saveDoc(this.get("currentUser"));
        },
        deleteUser : function () {
            var self = this;

            Ember.$.couch.db("_users").removeDoc(this.get("currentUser"), {
                success : function (data) {
                    self.removeObject(self.get("currentUser"));
                }
            });
        },
        findUser : function (id) {
            var user = Ember.Object.create({
                _id : id
            });

            // TODO: Fix voor asynchroon toevoegen van pagina! Met
            // Ember-Data zou dit opgelost moeten zijn
            Ember.App.router.applicationController.incrementProperty("amountOfLoaders");
            Ember.$.ajaxSetup({
                async : false
            });

            Ember.$.couch.db("_users").openDoc(id, {
                success : function (data) {
                    user.setProperties(data);
                }
            });

            // TODO: Fix voor asynchroon toevoegen van pagina! Met
            // Ember-Data zou dit opgelost moeten zijn
            Ember.App.router.applicationController.decrementProperty("amountOfLoaders");
            Ember.$.ajaxSetup({
                async : true
            });

            return user;
        },
        searchText : "",
        isAllowedSearchRequest : true,
        whenSearchTextChanged : function () {
            if (this.get("isLongEnoughSearchTerm")) {
                var self = this;

                if (this.get("isAllowedSearchRequest")) {
                    this.set("isAllowedSearchRequest", false);
                    this.searchUsers();

                    setTimeout(function () {
                        // TODO: Soms wordt request 2x uitgevoerd als er niets
                        // verandert, oplossing maakt code veel ingewikkelder,
                        // terwijl dit maar een klein performantie-probleem is
                        self.searchUsers();
                        self.set("isAllowedSearchRequest", true);
                    }, 1000);
                }
            } else if (this.get("length") !== 0) {
                this.set("content", []);
            }
        }.observes("searchText"),
        isLongEnoughSearchTerm : function () {
            return this.get("searchText.length") >= 2;
        }.property("searchText"),
        searchUsers : function () {
            var self = this;

            Ember.$.couch.db("_users").view("search/all", {
                key : this.get("searchText"),
                reduce : false,
                success : function (data) {
                    var newContent, i, user;

                    newContent = [];

                    for (i = 0; i < data.rows.length; i += 1) {
                        user = data.rows[i].value;

                        newContent.pushObject(Ember.Object.create(user));
                    }

                    self.set("content", newContent);
                }
            });
        },
        isEmptySearchResult : function () {
            return this.get("length") === 0;
        }.property("length")
    });
});
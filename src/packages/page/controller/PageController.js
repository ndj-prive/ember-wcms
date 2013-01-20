define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.ArrayController.extend({
        applicationController : null,
        isLoggedInBinding : "applicationController.isLoggedIn",
        currentPage : null,
        getPages : function () {
            var self, newContent;

            self = this;

            // TODO: Fix voor asynchroon opvullen van de pagina's! Met
            // Ember-Data zou dit opgelost moeten zijn
            // Ember.App.router.applicationController.incrementProperty("amountOfLoaders");
            Ember.$.ajaxSetup({
                async : false
            });

            Ember.$.couch.db("pages").allDocs({
                include_docs : true,
                success : function (data) {
                    var i, menuItem;

                    newContent = [];

                    for (i = 0; i < data.rows.length; i += 1) {
                        menuItem = data.rows[i].doc;

                        newContent.pushObject(Ember.Object.create(menuItem));
                    }
                }
            });

            // TODO: Fix voor asynchroon opvullen van de pagina's! Met
            // Ember-Data zou dit opgelost moeten zijn
            // Ember.App.router.applicationController.decrementProperty("amountOfLoaders");
            Ember.$.ajaxSetup({
                async : true
            });

            return newContent;
        },
        addPage : function () {
            var self, page;

            self = this;
            page = this.get("currentPage");

            // TODO: Fix voor asynchroon toevoegen van pagina! Met
            // Ember-Data zou dit opgelost moeten zijn
            // Ember.App.router.applicationController.incrementProperty("amountOfLoaders");
            Ember.$.ajaxSetup({
                async : false
            });

            Ember.$.couch.db("pages").saveDoc(page, {
                success : function (data) {
                    self.pushObject(page);
                }
            });

            // TODO: Fix voor asynchroon toevoegen van pagina! Met
            // Ember-Data zou dit opgelost moeten zijn
            // Ember.App.router.applicationController.decrementProperty("amountOfLoaders");
            Ember.$.ajaxSetup({
                async : true
            });
        },
        editPage : function (page) {
            if (page === undefined) {
                page = this.get("currentPage");
            }

            // TODO: Delete children pages property so it doesn't get saved to
            // the database
            delete page.children;
            Ember.$.couch.db("pages").saveDoc(page);
        },
        deletePage : function () {
            var self, page;

            self = this;
            page = this.get("currentPage");

            // TODO: Fix voor asynchroon toevoegen van pagina! Met
            // Ember-Data zou dit opgelost moeten zijn
            // Ember.App.router.applicationController.incrementProperty("amountOfLoaders");
            Ember.$.ajaxSetup({
                async : false
            });

            Ember.$.couch.db("pages").removeDoc(page, {
                success : function (data) {
                    self.removeObject(page);
                }
            });

            // TODO: Fix voor asynchroon toevoegen van pagina! Met
            // Ember-Data zou dit opgelost moeten zijn
            // Ember.App.router.applicationController.decrementProperty("amountOfLoaders");
            Ember.$.ajaxSetup({
                async : true
            });
        },
        showPage : function (page) {
            var self = this;

            Ember.$.couch.db("pages").openDoc(page.get("_id"), {
                success : function (data) {
                    page.setProperties(data);
                }
            });

            self.set("currentPage", page);
        },
        visiblePages : Ember.computed(function () {
            var visiblePages, rootPageArray, initChildrenRecursively;

            visiblePages = this.get("content");

            if (!this.get("isLoggedIn")) {
                visiblePages = this.filterProperty("isHidden", false);
            }

            rootPageArray = visiblePages.filterProperty("parent", null);

            initChildrenRecursively = function (pages, pageList) {
                var i, page, children;

                for (i = 0; i < pages.length; i += 1) {
                    page = pages[i];
                    children = pageList.filterProperty("parent", page.get("_id"));
                    page.set("children", children);

                    initChildrenRecursively(children, pageList);
                }
            };

            initChildrenRecursively(rootPageArray, visiblePages);

            return rootPageArray[0].get("children");
        }).property("isLoggedIn", "content.@each.isHidden", "content.@each.parent"),
        otherPages : Ember.computed(function () {
            var self, otherPages;
            self = this;
            otherPages = this.get("content").filter(function (page) {
                return page.get("_id") !== self.get("currentPage._id");
            });
            return otherPages;
        }).property("content", "currentPage"),
        rootPage : Ember.computed(function () {
            return this.findProperty("name", "root");
        }).property("content.@each.name"),
        getIndexPage : function () {
            if (this.get("length") === 0) {
                this.set("content", this.getPages());
            }

            return this.findProperty("name", "index");
        },
        get404Page : function () {
            return this.findProperty("name", "404");
        },
        findPage : function (id) {
            // TODO: Fix omdat deserialize eerder opgeroepen wordt dan
            // loadingPages! Ember-data lost dit op.
            if (this.get("length") === 0) {
                this.set("content", this.getPages());
            }

            var aPage = this.findProperty("_id", id);

            if (aPage === undefined) {
                aPage = this.get404Page();
            }

            return aPage;
        }
    });
});

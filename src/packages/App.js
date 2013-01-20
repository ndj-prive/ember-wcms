define([
    "Ember", "EmberData", "EmberDataAdapter", "ApplicationInit", "PageInit", "UserInit"
], function (Ember, DS, EmberDataAdapter, ApplicationInit, PageInit, UserInit) {
    "use strict";

    return {
        run : function () {
            // TODO: Ember-Data implementeren ipv jQuery Couch plugin te
            // gebruiken
            // Ember.App.store = DS.Store.create({
            // // adapter : DS.CouchDBAdapter.create({
            // // bulkCommit : false,
            // // db : "couchdb/pages"
            // // }),
            // adapter : DS.RESTAdapter.create({
            // bulkCommit : false,
            // namespace : "couchdb"
            // }),
            // revision : 8
            // });

            // TODO: configure your CouchDB host in .htaccess
            Ember.$.couch.urlPrefix = "couchdb";

            Ember.App = Ember.Application.create({
                //autoinit : false,
                LOG_TRANSITIONS : true
            });

            Ember.App.ready = function () {
                Ember.$("#initialLoading").remove();
            };

            ApplicationInit.initialize();
            PageInit.initialize();
            UserInit.initialize();

            Ember.App.Router.map(function () {
                this.resource("user", { path : "/user/:_id" }, function () {
                    this.route("search");
                    this.route("add");
                    this.route("show");
                    this.route("edit");
                    this.route("delete");
                });

                this.resource("page", { path : "/page/:_id" }, function () {
                    this.route("add");
                    this.route("show");
                    this.route("edit");
                    this.route("delete");
                });
            });

            //            Ember.App.Router = Ember.Router.extend({
            //                enableLogging : true
            //            });
            //
            //            Ember.App.initialize();
        }
    };
});

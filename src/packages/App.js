define([
    "Ember", "EmberData", "EmberDataAdapter", "ApplicationInit", "PageInit", "UserInit", "ApplicationRoute"
], function (Ember, DS, EmberDataAdapter, ApplicationInit, PageInit, UserInit, ApplicationRoute) {
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
                autoinit : false
            });

            Ember.App.ready = function () {
                Ember.$("#initialLoading").remove();
            };

            ApplicationInit.initialize();
            PageInit.initialize();
            UserInit.initialize();

            Ember.App.Router = Ember.Router.extend({
                enableLogging : true,
                root : Ember.Route.extend({
                    application : ApplicationRoute
                })
            });

            Ember.App.initialize();
        }
    };
});

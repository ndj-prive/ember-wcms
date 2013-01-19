define([
    "Ember", "UserSearchRoute", "UserAddRoute", "UserShowRoute", "UserEditRoute", "UserDeleteRoute"
], function (Ember, UserSearchRoute, UserAddRoute, UserShowRoute, UserEditRoute, UserDeleteRoute) {
    "use strict";

    return Ember.Route.extend({
        route : "/user",
        connectOutlets : function (router) {
            router.get("applicationController").connectOutlet({
                outletName : "applicationState",
                name : "user"
            });
        },
        index : Ember.Route.extend({
            route : "/",
            redirectsTo : "user.search"
        }),
        gotoSearch : Ember.Router.transitionTo("user.search"),
        search : UserSearchRoute,
        gotoAdd : Ember.Router.transitionTo("user.add"),
        add : UserAddRoute,
        gotoShow : Ember.Route.transitionTo("user.show"),
        show : UserShowRoute,
        gotoEdit : Ember.Route.transitionTo("user.edit"),
        edit : UserEditRoute,
        gotoDelete : Ember.Route.transitionTo("user.deletE"),
        deletE : UserDeleteRoute
    });
});

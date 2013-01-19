define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.Route.extend({
        route : "/search",
        connectOutlets : function (router) {
            router.get("userController").connectOutlet({
                outletName : "userState",
                viewClass : router.namespace.UserSearchView,
                controller : router.get("userController")
            });

            router.get("userController").connectOutlet({
                outletName : "userSearchInput",
                viewClass : router.namespace.UserSearchInputView,
                controller : router.get("userController")
            });

            router.get("userController").connectOutlet({
                outletName : "userSearchResult",
                viewClass : router.namespace.UserSearchResultView,
                controller : router.get("userController")
            });

            router.get("applicationController").updateTitle("user search");
        }
    });
});

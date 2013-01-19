define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.Route.extend({
        route : "/:id",
        deserialize : function (router, context) {
            return router.get("userController").findUser(context.id);
        },
        serialize : function (router, context) {
            return {
                id : context._id
            };
        },
        connectOutlets : function (router, context) {
            router.get("userController").set("currentUser", context);

            router.get("userController").connectOutlet({
                outletName : "userState",
                viewClass : router.namespace.UserShowView,
                controller : router.get("userController")
            });

            router.get("applicationController").updateTitle("user - " + context.get("name"));
        }
    });
});

define([
    "ember"
], function (ember) {
    "use strict";

    return ember.route.extend({
        route : "/:id/delete",
        deserialize : function (router, context) {
            return router.get("pagecontroller").findpage(context.id);
        },
        serialize : function (router, context) {
            return {
                id : context._id
            };
        },
        connectoutlets : function (router, context) {
            router.get("pagecontroller").set("currentpage", context);

            router.get("pagecontroller").connectoutlet({
                outletname : "pagestate",
                viewclass : router.namespace.pagedeleteview,
                controller : router.get("pagecontroller")
            });

            router.get("applicationcontroller").updatetitle("page delete - " + context.get("menutitle"));
        },
        confirm : function (router) {
            router.get("pagecontroller").deletepage();

            router.transitionto("page.index");
        }
    });
});

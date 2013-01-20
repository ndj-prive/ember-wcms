define([
    "Ember", "PageAddRoute", "PageShowRoute", "PageEditRoute", "PageDeleteRoute"
], function (Ember, PageAddRoute, PageShowRoute, PageEditRoute, PageDeleteRoute) {
    "use strict";

    return Ember.Route.extend({
        route : "/page",
        connectOutlets : function (router) {
            router.get("applicationController").connectOutlet({
                outletName : "applicationState",
                name : "page"
            });

            // TODO: PageController vullen met findAll()! (Ember-data)
            router.get("pageController").loadPages();

            router.get("pageController").connectControllers("application");

            router.get("pageController").connectOutlet({
                outletName : "menu",
                viewClass : router.namespace.MenuView,
                controller : router.get("pageController")
            });
            router.get("pageController").connectOutlet({
                outletName : "pageAddLink",
                viewClass : router.namespace.PageAddLinkView,
                controller : router.get("pageController")
            });
        },
        index : Ember.Route.extend({
            route : "/",
            connectOutlets : function (router) {
                router.get("pageController").loadPages();

                router.transitionTo("page.show", router.get("pageController").getIndexPage());
            }
        }),
        gotoAdd : Ember.Route.transitionTo("page.add"),
        add : PageAddRoute,
        gotoShow : Ember.Route.transitionTo("page.show"),
        show : PageShowRoute,
        gotoEdit : Ember.Route.transitionTo("page.edit"),
        edit : PageEditRoute,
        saveRenameMenuTitle : function (router, event) {
            var page = event.context;

            router.get("pageController").editPage(page);

            if (page === router.get("pageController.currentPage")) {
                router.get("applicationController").updateTitle(page.get("menuTitle"));
            }
        },
        gotoDelete : Ember.Route.transitionTo("page.deletE"),
        deletE : PageDeleteRoute
    });
});

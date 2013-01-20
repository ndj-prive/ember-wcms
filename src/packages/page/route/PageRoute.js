define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.Route.extend({
        renderTemplate : function () {
            var pageController = this.controllerFor("page");

            this.render("PageView", {
                outlet : "applicationState",
                controller : pageController
            });

            this.render("MenuView", {
                outlet : "menu",
                controller : pageController
            });

            this.render("PageAddLinkView", {
                outlet : "pageAddLink",
                controller : pageController
            });
        },
        setupController : function (controller, model) {
            var pageController, applicationController, pages;

            pageController = this.controllerFor("page");
            applicationController = this.controllerFor("application");
            pages = pageController.getPages();

            // TODO: PageController vullen met findAll()! (Ember-data)
            pageController.set("content", pages);
            pageController.set("applicationController", applicationController);

            //pageController.connectControllers("application");
        },
        events : {
            saveRenameMenuTitle : function (page) {
                var pageController, applicationController;

                pageController = this.controllerFor("page");
                applicationController = this.controllerFor("application");

                pageController.editPage(page);

                //TODO: Is this updateTitle still required?
                if (page === pageController.get("currentPage")) {
                    applicationController.updateTitle(page.get("menuTitle"));
                }
            }
        }
    });
});

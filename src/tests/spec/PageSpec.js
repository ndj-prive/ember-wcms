define([
    "Ember"
], function (Ember) {
    "use strict";

    return {
        controller : null,
        applicationController : null,
        run : function () {
            var self = this;

            this.controller = Ember.App.router.get("pageController");
            this.applicationController = Ember.App.router.get("applicationController");

            describe("Menu", function () {
                self.getPages();
                self.indexPage();

                var page = Ember.Object.create({
                    menuTitle : "Unit Test",
                    content : "Don't mind me, I'm just from the unit test.",
                    name : "unitTest",
                    isHidden : false
                });

                self.addPage(page);
                self.editPage(page);
                self.deletePage(page);
            });
        },
        getPages : function () {
            var self = this;

            it("get all pages", function () {
                var amountOfPages = self.controller.get("length");

                expect(amountOfPages).not.toBe(0);
            });
        },
        indexPage : function () {
            var self = this;

            it("index page", function () {
                var currentPageName, indexPageName;

                currentPageName = self.controller.get("currentPage.name");
                indexPageName = self.controller.getIndexPage().get("name");

                expect(currentPageName).toBe("index");
                expect(indexPageName).toBe("index");
            });
        },
        addPage : function (page) {
            var self = this;

            it("add page", function () {
                var previousAmountOfPages, currentAmountOfPages;

                previousAmountOfPages = self.controller.get("length");

                self.controller.set("currentPage", page);
                self.controller.addPage();

                waitsFor(function () {
                    return !self.applicationController.get("isLoading");
                }, "AJAX timeout", 10000);

                runs(function () {
                    self.controller.showPage(page);

                    waitsFor(function () {
                        return !self.applicationController.get("isLoading");
                    }, "AJAX timeout", 10000);

                    runs(function () {
                        currentAmountOfPages = self.controller.get("length");

                        expect(currentAmountOfPages).toBe(previousAmountOfPages + 1);
                        expect(page.get("name")).toBe("unitTest");
                    });
                });
            });
        },
        editPage : function (page) {
            var self = this;

            it("edit page", function () {
                page.set("name", "I have been edited");

                self.controller.set("currentPage", page);
                self.controller.editPage();

                waitsFor(function () {
                    return !self.applicationController.get("isLoading");
                }, "AJAX timeout", 10000);

                runs(function () {
                    self.controller.showPage(page);

                    waitsFor(function () {
                        return !self.applicationController.get("isLoading");
                    }, "AJAX timeout", 10000);

                    runs(function () {
                        expect(page.get("name")).toBe("I have been edited");
                    });
                });
            });
        },
        deletePage : function (page) {
            var self = this;

            it("delete page", function () {
                self.controller.set("currentPage", page);
                self.controller.deletePage();

                waitsFor(function () {
                    return !self.applicationController.get("isLoading");
                }, "AJAX timeout", 10000);

                runs(function () {
                    page = self.controller.findProperty("content", "Don't mind me, I'm just from the unit test.");

                    expect(page).toBe(undefined);
                });
            });
        }
    };
});

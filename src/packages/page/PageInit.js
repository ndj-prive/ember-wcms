define([
    "Ember", "PageController", "PageView", "MenuView", "PageAddView", "PageAddLinkView", "PageShowView", "PageEditView", "PageDeleteView", "PageRoute", "PageIndexRoute", "PageAddRoute", "PageShowRoute", "PageEditRoute", "PageDeleteRoute"
], function (Ember, PageController, PageView, MenuView, PageAddView, PageAddLinkView, PageShowView, PageEditView, PageDeleteView, PageRoute, PageIndexRoute, PageAddRoute, PageShowRoute, PageEditRoute, PageDeleteRoute) {
    "use strict";

    return {
        initialize : function () {
            Ember.App.PageController = PageController;

            Ember.App.PageRoute = PageRoute;
            Ember.App.PageIndexRoute = PageIndexRoute;
            Ember.App.PageView = PageView;

            Ember.App.MenuView = MenuView;
            Ember.App.PageAddLinkView = PageAddLinkView;

            Ember.App.PageAddRoute = PageAddRoute;
            Ember.App.PageAddView = PageAddView;

            Ember.App.PageShowRoute = PageShowRoute;
            Ember.App.PageShowView = PageShowView;

            Ember.App.PageEditRoute = PageEditRoute;
            Ember.App.PageEditView = PageEditView;

            Ember.App.PageDeleteRoute = PageDeleteRoute;
            Ember.App.PageDeleteView = PageDeleteView;
        }
    };
});

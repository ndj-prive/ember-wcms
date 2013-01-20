(function () {
    "use strict";

    require.config({
        baseUrl : "",
        paths : {
            // RequireJS-plugins
            domReady : "lib/require/domReady",
            text : "lib/require/text",

            // Frameworks
            Ember : "lib/ember/ember",
            EmberData : "lib/ember/ember-data",
            EmberDataAdapter : "lib/ember/ember-couchdb-adapter",
            Handlebars : "lib/ember/handlebars",

            jQuery : "lib/jquery/js/jquery",
            jQueryUI : "lib/jquery/js/jquery-ui",
            jQueryValidity : "lib/jquery/js/jquery.validity",
            jQueryCouch : "lib/jquery/js/jquery.couch",
            Bootstrap : "lib/bootstrap/js/bootstrap",

            Editor : "lib/ckeditor/ckeditor",

            GoogleAnalytics : "lib/google/googleAnalytics",

            // TODO: For unit testing
            // Jasmine
            Jasmine : "lib/jasmine/js/jasmine",
            JasmineHTML : "lib/jasmine/js/jasmine-html",
            JasmineJQuery : "lib/jasmine/js/jasmine-jquery",

            // App
            App : "src/packages/App",

            // Application
            ApplicationInit : "src/packages/application/ApplicationInit",
            // Routes
            ApplicationRoute : "src/packages/application/route/ApplicationRoute",
            IndexRoute : "src/packages/application/route/IndexRoute",
            // Controllers
            ApplicationController : "src/packages/application/controller/ApplicationController",
            LoginController : "src/packages/application/controller/LoginController",
            // Views
            ApplicationView : "src/packages/application/view/ApplicationView",
            LoginView : "src/packages/application/view/LoginView",
            AdminNavigationView : "src/packages/application/view/AdminNavigationView",
            LoadingView : "src/packages/application/view/LoadingView",
            // Templates
            ApplicationTemplate : "src/packages/application/template",

            // Page
            PageInit : "src/packages/page/PageInit",
            // Routes
            PageRoute : "src/packages/page/route/PageRoute",
            PageIndexRoute : "src/packages/page/route/PageIndexRoute",
            PageAddRoute : "src/packages/page/route/PageAddRoute",
            PageShowRoute : "src/packages/page/route/PageShowRoute",
            PageEditRoute : "src/packages/page/route/PageEditRoute",
            PageDeleteRoute : "src/packages/page/route/PageDeleteRoute",
            // Models
            Page : "src/packages/page/model/Page",
            // Controllers
            PageController : "src/packages/page/controller/PageController",
            // Views
            PageView : "src/packages/page/view/PageView",
            MenuView : "src/packages/page/view/MenuView",
            MenuItemView : "src/packages/page/view/MenuItemView",
            PageAddView : "src/packages/page/view/PageAddView",
            PageAddLinkView : "src/packages/page/view/PageAddLinkView",
            PageShowView : "src/packages/page/view/PageShowView",
            PageEditView : "src/packages/page/view/PageEditView",
            PageDeleteView : "src/packages/page/view/PageDeleteView",
            // Templates
            PageTemplate : "src/packages/page/template",

            // User
            UserInit : "src/packages/user/UserInit",
            // Routes
            UserRoute : "src/packages/user/route/UserRoute",
            UserIndexRoute : "src/packages/user/route/UserIndexRoute",
            UserSearchRoute : "src/packages/user/route/UserSearchRoute",
            UserAddRoute : "src/packages/user/route/UserAddRoute",
            UserShowRoute : "src/packages/user/route/UserShowRoute",
            UserEditRoute : "src/packages/user/route/UserEditRoute",
            UserDeleteRoute : "src/packages/user/route/UserDeleteRoute",
            // Models
            User : "src/packages/user/model/User",
            // Controllers
            UserController : "src/packages/user/controller/UserController",
            // Views
            UserView : "src/packages/user/view/UserView",
            UserSearchView : "src/packages/user/view/UserSearchView",
            UserSearchInputView : "src/packages/user/view/UserSearchInputView",
            UserSearchResultView : "src/packages/user/view/UserSearchResultView",
            UserAddView : "src/packages/user/view/UserAddView",
            UserShowView : "src/packages/user/view/UserShowView",
            UserEditView : "src/packages/user/view/UserEditView",
            UserDeleteView : "src/packages/user/view/UserDeleteView",
            // Templates
            UserTemplate : "src/packages/user/template",

            // Utilities
            TitleTextField : "src/utility/TitleTextField",
            DatepickerTextField : "src/utility/DatepickerTextField",
            Validator : "src/utility/Validator",
            EditorInit : "src/utility/EditorInit",

            // TODO: For unit testing
            // Specs
            AllSpecs : "src/tests/AllSpecs",
            LoginSpec : "src/tests/spec/LoginSpec",
            PageSpec : "src/tests/spec/PageSpec",
            UserSpec : "src/tests/spec/UserSpec"
        },
        shim : {
            "jQuery" : {
                exports : "jQuery"
            },
            "jQueryUI" : {
                deps : [
                    "jQuery"
                ],
                exports : "jQuery"
            },
            "jQueryValidity" : {
                deps : [
                    "jQuery"
                ],
                exports : "jQuery"
            },
            "jQueryCouch" : {
                deps : [
                    "jQuery"
                ],
                exports : "jQuery"
            },
            "Bootstrap" : {
                deps : [
                    "jQuery"
                ],
                exports : "jQuery"
            },
            "Ember" : {
                deps : [
                    "jQuery", "Handlebars", "Bootstrap", "jQueryUI", "jQueryValidity", "jQueryCouch"
                ],
                exports : "Ember"
            },
            "EmberData" : {
                deps : [
                    "Ember"
                ],
                exports : "DS"
            },
            "EmberDataAdapter" : {
                deps : [
                    "EmberData"
                ],
                exports : "DS"
            },
            "Editor" : {
                deps : [
                    "EditorInit"
                ],
                exports : "CKEDITOR"
            },
            // TODO: For unit testing
            "Jasmine" : {
                exports : "jasmine"
            },
            "JasmineHTML" : {
                deps : [
                    "Jasmine"
                ],
                exports : "jasmine"
            },
            "JasmineJQuery" : {
                deps : [
                    "Jasmine"
                ],
                exports : "jasmine"
            }
        }
    });

    require([
        "App", "domReady", "GoogleAnalytics"
    ], function (App, domReady) {
        domReady(function () {
            App.run();

            // TODO: For unit testing
            if (window.unitTesting) {
                require([
                    "AllSpecs"
                ], function (AllSpecs) {
                    AllSpecs.run();
                });
            }
        });
    });
}());

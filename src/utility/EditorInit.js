(function () {
    "use strict";

    var path, lastSlash;

    path = document.location.pathname;
    lastSlash = path.lastIndexOf("/") + 1;

    window.CKEDITOR_BASEPATH = path.substring(0, lastSlash) + "lib/ckeditor/";
}());

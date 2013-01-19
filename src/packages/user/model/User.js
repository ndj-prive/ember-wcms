define([
    "EmberData"
], function (DS) {
    "use strict";

    return DS.Model.extend({
        primaryKey : "_id",
        _id : DS.attr("string"),
        _rev : DS.attr("string"),
        name : DS.attr("string"),
        type : DS.attr("string"),
        roles : [],
        password : DS.attr("string"),

        firstName : DS.attr("string"),
        lastName : DS.attr("string"),
        emailAddress : DS.attr("string"),
        cellphoneNumber : DS.attr("string"),
        telephoneNumber : DS.attr("string"),
        streetAndNr : DS.attr("string"),
        zipCode : DS.attr("string"),
        city : DS.attr("string"),
        birthDate : DS.attr("date")
    });
});

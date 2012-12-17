define([
	"EmberData"
], function (DS) {
	"use strict";

	return DS.Model.extend({
		primaryKey : "_id",
		_id : DS.attr("string"),
		_rev : DS.attr("string"),
		name : DS.attr("string"),
		content : DS.attr("string"),
		menuTitle : DS.attr("string")
	// id: function(key, value) {
	// // map _id (couchdb) to id (ember)
	// if (arguments.length === 1) {
	// return this.get("_id");
	// }
	// else {
	// this.set("_id", value);
	// return value;
	// }
	// }.property("_id").cacheable()

	// url: "pages/%@",
	// collectionUrl: "pages"
	});
});
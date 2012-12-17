define([
	"Ember"
], function (Ember) {
	"use strict";

	return Ember.ArrayController.extend({
		applicationController : null,
		isLoggedInBinding : "applicationController.isLoggedIn",
		currentPage : null,
		loadPages : function () {
			var self = this;

			// TODO: Fix voor asynchroon opvullen van de pagina's! Met
			// Ember-Data zou dit opgelost moeten zijn
			Ember.App.router.applicationController.incrementProperty("amountOfLoaders");
			Ember.$.ajaxSetup({
				async : false
			});

			Ember.$.couch.db("pages").allDocs({
				include_docs : true,
				success : function (data) {
					var newContent, i, menuItem;

					newContent = [];

					for (i = 0; i < data.rows.length; i += 1) {
						menuItem = data.rows[i].doc;

						newContent.pushObject(Ember.Object.create(menuItem));
					}

					self.set("content", newContent);
				}
			});

			// TODO: Fix voor asynchroon opvullen van de pagina's! Met
			// Ember-Data zou dit opgelost moeten zijn
			Ember.App.router.applicationController.decrementProperty("amountOfLoaders");
			Ember.$.ajaxSetup({
				async : true
			});
		},
		addPage : function () {
			var self, page;

			self = this;
			page = this.get("currentPage");

			// TODO: Fix voor asynchroon toevoegen van pagina! Met
			// Ember-Data zou dit opgelost moeten zijn
			Ember.App.router.applicationController.incrementProperty("amountOfLoaders");
			Ember.$.ajaxSetup({
				async : false
			});

			Ember.$.couch.db("pages").saveDoc(page, {
				success : function (data) {
					self.pushObject(page);
				}
			});

			// TODO: Fix voor asynchroon toevoegen van pagina! Met
			// Ember-Data zou dit opgelost moeten zijn
			Ember.App.router.applicationController.decrementProperty("amountOfLoaders");
			Ember.$.ajaxSetup({
				async : true
			});
		},
		editPage : function (page) {
			if (page === undefined) {
				page = this.get("currentPage");
			}

			Ember.$.couch.db("pages").saveDoc(page);
		},
		deletePage : function () {
			var self, page;

			self = this;
			page = this.get("currentPage");

			Ember.$.couch.db("pages").removeDoc(page, {
				success : function (data) {
					self.removeObject(page);
				}
			});
		},
		showPage : function (page) {
			var self = this;

			Ember.$.couch.db("pages").openDoc(page.get("_id"), {
				success : function (data) {
					page.setProperties(data);
				}
			});

			self.set("currentPage", page);
		},
		// TODO: Deze code hoort in de view?
		visiblePages : function () {
			var visiblePages = this.get("content");

			if (!this.get("isLoggedIn")) {
				visiblePages = this.filterProperty("isHidden", false);
			}

			return visiblePages;
		}.property("isLoggedIn", "content.@each.isHidden"),
		getIndexPage : function () {
			return this.findProperty("name", "index");
		},
		get404Page : function () {
			return this.findProperty("name", "404");
		},
		findPage : function (id) {
			// TODO: Fix omdat deserialize eerder opgeroepen wordt dan
			// loadingPages! Ember-data lost dit op.
			if (this.get("length") === 0) {
				this.loadPages();
			}

			var aPage = this.findProperty("_id", id);

			if (aPage === undefined) {
				aPage = this.get404Page();
			}

			return aPage;
		}
	});
});
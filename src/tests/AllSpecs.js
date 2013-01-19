define([
	"LoginSpec", "PageSpec", "UserSpec", "Jasmine", "JasmineHTML", "JasmineJQuery"
], function (LoginSpec, PageSpec, UserSpec, Jasmine) {
	"use strict";

	return {
		run : function () {
			LoginSpec.run();
			PageSpec.run();
			UserSpec.run();

			Jasmine.getEnv().addReporter(new Jasmine.TrivialReporter());
			Jasmine.getEnv().execute();
		}
	};
});
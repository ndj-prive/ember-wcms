JS=$(shell find src -name "*.js")
JS_HINT= ./node_modules/jslint/bin/jslint.js
REQUIRE_JS=./node_modules/requirejs/bin/r.js --browser

all: lint build

lint: $(JS)
	@$(JS_HINT) $^

build: build-js.js build-css.js
	@cp -r img build/img
	@cp -r lib/ckeditor build/lib/ckeditor

build-js.js:
	@$(REQUIRE_JS) -o $@

build-css.js:
	@$(REQUIRE_JS) -o $@

clean:
	@rm -rf build/img /lib/ckeditor

.PHONY: clean build lint

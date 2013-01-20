JS=$(shell find src -name "*.js")
JS_LINT=./node_modules/jslint/bin/jslint.js --nomen true --browser true --maxlen 200 --predef require --predef define --predef describe --predef it --predef runs --predef expect --predef waitsFor
REQUIRE_JS=./node_modules/requirejs/bin/r.js

build:
	@$(REQUIRE_JS) -o build-js.js
	@$(REQUIRE_JS) -o build-css.js
	@rm -rf $@
	@cp -r example $@
	@cp -r img $@
	@cp -r lib/ckeditor $@/lib

lint: $(JS)
	@$(JS_LINT) $^

clean:
	@rm -rf scaffold

.PHONY: clean build lint

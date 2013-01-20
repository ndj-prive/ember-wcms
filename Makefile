JS = $(shell find src -name "*.js")
JSLINT = ./node_modules/jslint/bin/jslint.js
REQUIREJS = ./node_modules/requirejs/bin/r.js

build:
	@$(REQUIREJS) -o optimize-js.js
	@$(REQUIREJS) -o optimize-css.js
	@rm -rf $@
	@cp -r example $@
	@cp -r img $@
	@cp -r lib/ckeditor $@/lib

lint: $(JS)
	@$(JSLINT) $^ --nomen true --browser true --maxlen 200 --predef require --predef define --predef describe --predef it --predef runs --predef expect --predef waitsFor

clean:
	@rm -rf scaffold

.PHONY: clean build lint

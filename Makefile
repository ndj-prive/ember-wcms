JS = $(shell find lib -name "*.js")
REQUIRE_JS = node ./node_modules/requirejs/bin/r.js

all: build build-js.js build-css.js

lint: $(JS)
	jslint $<

build-js.js:
	$(REQUIRE_JS) -o $@

build-css.js:
	$(REQUIRE_JS) -o $@

build: build/img build/lib/ckeditor

build/img: img
	cp -r $< $@

build/lib/ckeditor: lib/ckeditor
	cp -r $< $@

clean:
	rm -rf build/img build/lib/ckeditor

.PHONY: clean build

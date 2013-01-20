all: build build-js.js build-css.js

# optimize with require.js optimizer
build-js.js:
	node r.js -o $@

# optimize with require.js optimizer
build-css.js:
	node r.js -o $@

build: build/img build/lib/ckeditor


build/img: img
	mkdir -p build
	cp -r $< $@

build/lib/ckeditor: lib/ckeditor
	mkdir -p build
	mkdir -p build/lib
	cp -r $< $@

clean:
	rm -rf build

.PHONY: clean


build: index.js kinetic-graphs.css components
	@component build --dev

components:
	@component install --dev

clean:
	rm -fr build components

.PHONY: clean

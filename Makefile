#Makefile

install:
	npm install

start:
	npm run babel-node -- src/bin/gendiff.js before_tree.ini after_tree.ini

publish:
	npm publish

lint:
	npm run eslint .

test:
	npm test

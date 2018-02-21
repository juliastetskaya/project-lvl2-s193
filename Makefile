#Makefile

install:
	npm install

start:
	npm run babel-node -- src/bin/gendiff.js before.ini after.ini

publish:
	npm publish

lint:
	npm run eslint .

test:
	npm test

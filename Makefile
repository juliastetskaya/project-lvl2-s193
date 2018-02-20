#Makefile

install:
	npm install

start:
	npm run babel-node -- src/bin/gendiff.js --help

publish:
	npm publish

lint:
	npm run eslint .

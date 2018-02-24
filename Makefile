#Makefile

install:
	npm install

start:
	npm run babel-node -- src/bin/gendiff.js --format json before_tree.json after_tree.json

publish:
	npm publish

lint:
	npm run eslint .

test:
	npm test

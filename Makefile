test:
	(cd lambda && npm test)

compile:
	./lambda/node_modules/typescript/bin/tsc -p ./lambda/

copy:
	cp -r ./lambda/node_modules ./lambda/dist/

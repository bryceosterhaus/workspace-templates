#!/bin/bash

function main {
	npx create-react-app ${PROMPTS_NAME}

	clean_unnecessary_files

	sed -i -e "s|<div id=\"root\"></div>|<${PROMPTS_NAME} route=\"hello-world\"></${PROMPTS_NAME}>|g" public/index.html
}

function clean_unnecessary_files {
	rm -f public/favicon.ico public/logo* public/manifest.json public/robots.txt

	cd src

	rm -f App* index* logo.svg reportWebVitals.js setupTests.js

	cd ..
}
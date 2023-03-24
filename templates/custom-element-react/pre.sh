#!/bin/bash

npx create-react-app ${PROMPTS_NAME}

rm -f public/favicon.ico public/logo* public/manifest.json public/robots.txt

cd src

rm -f App* index* logo.svg reportWebVitals.js setupTests.js

cd ..

sed -i -e "s|<div id=\"root\"></div>|<${PROMPTS_NAME} route=\"hello-world\"></${PROMPTS_NAME}>|g" public/index.html
